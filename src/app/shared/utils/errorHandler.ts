export function handleError(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს. სცადეთ ავტორიზაცია.';
    case 'auth/wrong-password':
      return 'არასწორი ელ-ფოსტა ან/და პაროლი.';
    case 'auth/user-not-found':
      return 'მომხმარებელი ასეთი ელ-ფოსტით არ არსებობს.';
    case 'auth/user-disabled':
      return 'User disabled.';
    case 'auth/operation-not-allowed':
      return 'Too many requests to log into this account.';
    case 'auth/operation-not-allowed':
      return 'Server error, please try again later.';
    case 'auth/invalid-email':
      return 'გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა.';
    default:
      return 'მოხდა შეცდომა. გთხოვთ სცადეთ თავიდან.';
  }
}
export function showAuthError(error: any) {
  return handleError(error.code);
}