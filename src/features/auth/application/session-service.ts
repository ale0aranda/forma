export interface SessionUser {
  id: string;
  email?: string | undefined;
}

export interface SessionService {
  getUser(): Promise<SessionUser | undefined>;
  isAuthenticated(): Promise<boolean>;
  hasVerifiedClaims(): Promise<boolean>;
}

export function getSessionUser(
  service: SessionService
): Promise<SessionUser | undefined> {
  return service.getUser();
}

export function isAuthenticated(service: SessionService): Promise<boolean> {
  return service.isAuthenticated();
}

export function hasVerifiedClaims(service: SessionService): Promise<boolean> {
  return service.hasVerifiedClaims();
}
