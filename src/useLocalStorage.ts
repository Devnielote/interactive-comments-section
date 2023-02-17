import { faker } from "@faker-js/faker";
import { Account } from "./accounts/Account";
import { Comment, CommentTypeEnum } from "./comments/comment.model";

export let users: Account[];
export let updatedUsers: Account[];
let initialUsers = getAccountsFromStorage();

if(initialUsers){
  users = [...initialUsers];
} else {
  initialUsers = createInitialAccounts()
}

function createInitialAccounts():Account[] {
  let initialAccounts = [];
  for(let i = 0; i < 4; i++){
    let account = new Account();
    let comment = new Comment(
      faker.lorem.paragraph(),
      faker.datatype.number({
        'min': 1,
        'max': 20,
      }),
      CommentTypeEnum.comment
     );
      account.createComment(comment);
      initialAccounts.push(account);
    }

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

