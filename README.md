#Split wall

##Git-flow

####How to name your supporting branch prefixes?
- Feature branches? [feature/]
- Release branches? [release/]
- Hotfix branches? [hotfix/]
- Support branches? [support/]

####Creating a feature branch
```
git checkout develop
git checkout -b feature_branch
```
####Finishing a feature branch
```
git checkout develop
git merge feature_branch
```

####Release Branches
```
git checkout develop
git checkout -b release/0.1.0
```

Test, and when is ready:
```
git checkout master
git merge release/0.1.0```
```

####Hot fix
```
git checkout master
git checkout -b hotfix_branch
```

Then, is similar to finishing a release branch, a hotfix branch gets merged into both master and develop.
```
git checkout master
git merge hotfix_branch
git checkout develop
git merge hotfix_branch
git branch -D hotfix_branch
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
