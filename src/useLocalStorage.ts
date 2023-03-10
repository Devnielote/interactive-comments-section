import { faker } from "@faker-js/faker";
import { Account } from "./accounts/Account";

export let users: Account[];
export let currentUserV2: Account;

let initialUsers = getAccountsFromStorage();

if(initialUsers){
  users = generateAccountsFromLocalStorage(initialUsers);
  currentUserV2 = users[4];
} else {
  initialUsers = createInitialAccounts()
}

function createInitialAccounts():Account[] {
  let initialAccounts = [];
  for(let i = 0; i < 4; i++){
    let account = new Account();
      account.createComment(
        faker.lorem.paragraph(),
      );
      initialAccounts.push(account);
    }
    currentUserV2 = new Account;
    initialAccounts.push(currentUserV2);
    localStorage.setItem('accounts', JSON.stringify(initialAccounts));
    return initialAccounts;
};

export function getAccountsFromStorage(): Account[]  {
  const accountsFromStorage = localStorage.getItem('accounts');
  return accountsFromStorage ? JSON.parse(accountsFromStorage) : false;
};

export function setAccountsToStorage(account: Account []): void {
  localStorage.setItem('accounts', JSON.stringify(account));
};

function generateAccountsFromLocalStorage( array: Account[]): Account[] {
  let newAccounts: Account[] = [];
  array.map(acc => {
    newAccounts.push(new Account(acc))
  })
  return newAccounts;
}
