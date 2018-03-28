const accounts = {
  a: 100,
  b: 40,
  c: 200
};

function getAccount() {
  let accountName = prompt('Enter an account name');
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

/*
  The problem with transfer is that it removes money
  from an account and then runs some code that might
  throw an exception.
*/

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}

/*
  One way to account for the problem with transfer
  is to write code with less side effects. Here is
  an example of transfer with no side effects.
*/

function pureTransfer(from, amount) {
  if (accounts[from] < amount) return;
  let accountsCopy = Object.assign({}, accounts);
  let to = getAccount();
  accountsCopy[from] -= amount;
  accountsCopy[to] += amount;
  return accountsCopy;
}

/*
  It isn't always practical to write code with no
  side effects, though, and this is where the finally
  block comes into play.
*/

function safeTransfer(from, amount) {
  if (accounts[from] < amount) return;
  try {
    let progress = 0;
    accounts[from] -= amount;
    account[getAccount()] += amount;
    let progress = 1; //all is well
  } finally {
    if (progress === 0) { //transfer didn't complete
      accounts[from] += amount; //put the money back
    }
  }
}