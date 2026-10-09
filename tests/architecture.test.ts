import { readdirSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

import ts from 'typescript';
import { expect, it } from 'vitest';

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      return sourceFiles(path);
    }

    return /\.(ts|tsx)$/.test(entry.name)
      && !/\.(test|spec)\.(ts|tsx)$/.test(entry.name)
      ? [path]
      : [];
  });
}

it('keeps domain, application, presentation and shared boundaries', () => {
  const violations: string[] = [];

  for (const file of sourceFiles(resolve('src'))) {
    const filename = relative(process.cwd(), file).replaceAll('\\', '/');
    const source = ts.createSourceFile(
      file,
      readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true
    );

    function visit(node: ts.Node) {
      let specifier: string | undefined;

      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
        && node.moduleSpecifier
        && ts.isStringLiteral(node.moduleSpecifier)
      ) {
        specifier = node.moduleSpecifier.text;
      }

      if (
        ts.isCallExpression(node)
        && (node.expression.kind === ts.SyntaxKind.ImportKeyword
          || (ts.isIdentifier(node.expression)
            && node.expression.text === 'require'))
      ) {
        const argument = node.arguments[0];

        if (argument && ts.isStringLiteral(argument)) {
          specifier = argument.text;
        }
      }

      if (specifier) {
        const target = specifier.startsWith('@/')
          ? specifier.slice(2)
          : specifier.startsWith('.')
            ? relative(
                process.cwd(),
                resolve(dirname(file), specifier)
              ).replaceAll('\\', '/')
            : specifier;

        const domain = filename.includes('/domain/');
        const application = filename.includes('/application/');
        const presentation = filename.includes('/presentation/');
        const shared = filename.startsWith('src/shared/');
        const external =
          !specifier.startsWith('@/') && !specifier.startsWith('.');

        let invalid = false;

        if (domain) {
          invalid = external || !target.includes('/domain/');
        }

        if (application) {
          invalid =
            external
            || target.includes('/infrastructure/')
            || target.includes('/presentation/')
            || target.startsWith('src/composition/')
            || target.startsWith('app/');
        }

        if (presentation) {
          invalid =
            target.includes('/infrastructure/')
            || target.startsWith('@supabase/');
        }

        if (shared) {
          invalid =
            target.startsWith('src/features/')
            || target.startsWith('src/composition/')
            || target.startsWith('app/');
        }

        if (invalid) {
          violations.push(`${filename}: ${specifier}`);
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  expect(violations).toEqual([]);
});
