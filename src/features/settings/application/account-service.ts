export type DeleteAccountResult = 'unauthenticated' | 'failed' | 'deleted';

export interface AccountService {
  deleteAccount(): Promise<DeleteAccountResult>;
}

export function createAccountUseCases(service: AccountService) {
  return {
    deleteAccount(): Promise<DeleteAccountResult> {
      return service.deleteAccount();
    }
  };
}
