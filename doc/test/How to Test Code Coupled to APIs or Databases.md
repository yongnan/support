# How to Test Code Coupled to APIs or Databases

[Test-Driven Development](https://khalilstemmler.com/articles/categories/test-driven-development)

Last updated Nov 17th, 2021

In the real-world, there's more to test than pure functions and React components. We have entire bodies of code that rely on databases, caches, APIs, and other infrastructural concerns. Depending on our testing strategy, our first task may be to apply some distance between two types of code: core code and infrastructure code. With the help of a layered architecture, we introduce testing options and expose ways in which we can develop a healthy testing strategy for code reliant on infrastructure like APIs or databases.

[typescript](https://khalilstemmler.com/articles/tags/type-script/)[test-driven development](https://khalilstemmler.com/articles/tags/test-driven-development/)[bdd](https://khalilstemmler.com/articles/tags/bdd/)[core code](https://khalilstemmler.com/articles/tags/core-code/)[infrastructure code](https://khalilstemmler.com/articles/tags/infrastructure-code/)

![img](https://d33wubrfki0l68.cloudfront.net/003943210f2c2b3f39b2955e95f3627f5c94f40e/76526/img/blog/tdd/test-driven-development.png)

In our humble [introduction to Test-Driven Development](https://khalilstemmler.com/articles/test-driven-development/introduction-to-tdd/), we learned the basics of TDD. You now know that you should start with a failing test, write the mininum amount of code to make it pass, and refactor it to make it cleaner. Red-green-refactor.

Straightforward, right? Though it may take a while to internalize and start working this way, the physical aspect - the mechanics of it - are pretty easy to grasp. That's the good news.

What's *not* good news is that when you get out there into the real world, you're going to encounter situations where you need to test code that relies on a variety of **infrastructural dependencies**: external APIs, services, databases, caches, webhooks, and so on.

It is incredibly common for developers new to TDD to give up their test-driven journey at this point. When I first started with TDD years ago, it just didn't seem practical. I was only able to figure out how to TDD my way though simple things like simple functions or pure React components.

The question then, is this: how do we test code that relies on *infrastructural* concerns? Do we spin up a database, tear it down, and seed it everytime we want to write a unit test? Do we spend *real money* everytime we want to test code that relies on a paid external API? (Hint: the answer is no, you don't *have* to).

In this post, we'll discuss how to test code that relies on infrastructure. And we'll do so by *first* **separating core code from infrastructure code**.

## Watch on YouTube

<iframe width="100%" height="428px" src="https://www.youtube.com/embed/ajfZqzeHp1E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="box-sizing: inherit; margin: 0px 0px 1.45rem; padding: 0px;"></iframe>

**Please excuse the first few moments of bouncy video - I learned I can't rest my arm on my desk when recording video :)** I'm starting up [my YouTube channel](https://www.youtube.com/channel/UC-Lpxe2OBCsUXbMSS1zUu_g)! If you prefer this way of teaching, please like and subscribe ❤️.

## Core code and infrastructure code

What do I mean by *core code* and *infrastructure code*? And why is it important to keep them separate?

### Core code

Core code is the heart of your application. This is your family jewels. It's what makes your app special.

This code is also the code that represents the [essential complexity](https://khalilstemmler.com/articles/software-design-architecture/feature-driven/#Essential-complexity). It encapsulates the real-world complexity of the domain and the application.

Consider a `createUser` [use case](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/). You need to:

- 1. Check that that the user's details like their email and password are valid
- 1. Check that the account wasn't already created, and
- 1. Confirm that the user's handle wasn't already taken

Because these rules represent the nature of the application and what makes the [use case](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/) succeed or fail, we call this [application logic](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/#3-Application-Logic--Use-Cases). Application logic usually depends on infrastructure, so depending on the way we write it, it *may* or *may not* be completely pure and decoupled from infrastructure.

On the other hand, if we think a layer deeper, we get to [domain logic](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/#Clean-architecture-expanded). Domain logic is moreso about the data and behavior of the core business objects (think `User` [entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/) or `Email` [value objects](https://khalilstemmler.com/articles/typescript-value-object/)). Because of this, we could benefit by thinking back to [state machines](https://khalilstemmler.com/blogs/philosophy/existential-state-machines/#State-machines) and drawing out legal behavior.

For example, let's consider a washing machine. The *state machine* for a washing machine would illustrate the fact that you can go from `OFF` to `ON` and then `WASH`, but it would restrict you going from `OFF` to `WASH` to `ON`. That'd put the washing machine into an [illegal state](https://khalilstemmler.com/articles/typescript-domain-driven-design/make-illegal-states-unrepresentable/). Domain logic is about enforcing these rules - typically validation and object behavior.

![Washing machine](https://khalilstemmler.com/img/blog/philosophy/existential-state-machines/washing-machine-state-machine.svg)

Domain logic is normally pure. It normally contains zero dependencies to *infrastructure* and it is written by you. This makes it very easy to unit test.

All of this stuff needs to get tested. As a test-driven developer, your goal is to turn the essential complexity that is your application and domain logic into *tested code* - using the simplest, most flexible and maintainable way you know how.

### Infrastructure code

In the real world, the way to realize a web application is to integrate it with infrastructure. Application and domain logic can't do much if we can't host it somewhere in the cloud, if it doesn't maintain state somehow, or if we can't make requests to the backend API.

On the backend, infrastructure code is denoted by concerns like your database, your cache, your local file system, or your REST or GraphQL web server. On the front-end, this is your view-layer library, your GraphQL or REST client, and your browser APIs.

All of these concerns are things that we don't own. We either download them, connect to them over the network, or they exist as a part of the platform upon which our code executes. They are *infrastructural*.

Unlike core code, we don't *unit test* it [1](https://khalilstemmler.com/articles/test-driven-development/how-to-test-code-coupled-to-apis-or-databases/#fn-1). Instead, we want to test the way that it *integrates* — that's a key word: integrates. **We want to test how it integrates with our code core**.

Therefore, we write integration tests.

For example, one particular type of integration test is called a *Contract Test*. This ensures that - for example, our database adapter can save and retrieve objects in the way we expect it to.

Therefore, we need to write different types of tests for different aspects of our application.

- Integration tests for testing integrations
- Unit tests for testing the core application functionality — the most valuable aspects of our software

What's stopping us from getting to the point where we can do this?

## The problem: coupled core and infrastructure code

The problem is that this isn't really possible when your core code and your infrastructure code is mixed. Actually, the better word to use is [coupled](https://khalilstemmler.com/wiki/coupling-cohesion-connascence/#Coupling) to each other.

If your core code and your infrastructure code is coupled, we can't cleanly isolate parts of our code cleanly in order to write these specific types of tests.

What we end up doing instead is coupling way too much core code in RESTful API controllers or GraphQL resolvers and suddenly, the only way to test the *application core* (the [features](https://khalilstemmler.com/articles/software-design-architecture/feature-driven/), yes - the heart of our software) is to bring a database and a web server along for the ride. This makes things very slow and it makes tests harder to setup and teardown.

## Example: Coupled feature

Here's an example of a feature with coupled core and infrastructure code.

You can view the before and after code [here on GitHub](https://github.com/stemmlerjs/how-to-test-code-reliant-on-apis).

```typescript
// modules/users/useCases/createUser/index.ts

import * as express from 'express'
import { User } from '../../domain/user';
import { firebaseUserRepo } from '../../repos';
import { UsersService } from '../../services/usersService'

export async function createUser (req: express.Request, res: express.Response) {
  let body = req.body;

    // Check to see if firstname, lastname, password, email is in the request
    const isFirstNamePresent = body.firstName
    const isLastNamePresent = body.lastName;
    const isEmailPresent = body.email;
    const isPasswordPresent = body.password;

    // If not, end the request
    if (!isFirstNamePresent || !isEmailPresent || !isLastNamePresent || !isPasswordPresent) {
      return res.status(400).json({ 
        message: `Either 'firstName', 'lastName', 'email' or 'password not present`
      })
    }

    // Check to see if already registered
    const existingUser = await firebaseUserRepo.findByEmail(body.email);
        
    // If already registered, return AlreadyRegisteredError
    if (existingUser) {
      return res.status(409).json({
        type: `AlreadyRegisteredError`,
        message: 'User already registered'
      })
    }

    let errorMessage;

    // Validation logic
    if (UsersService.validateFirstName(body.firstName)) {
      errorMessage = 'Invalid firstName';
    }

    if (UsersService.validateLastName(body.lastName)) {
      errorMessage = 'Invalid lastName';
    }

    if (UsersService.validateEmail(body.email)) {
      errorMessage = 'Invalid email';
    }

    if (UsersService.validatePassword(body.password)) {
      errorMessage = 'Invalid password';
    }

    // If invalid props, return InvalidUserDetailsError
    if (errorMessage) {
      return res.status(400).json({
        type: 'InvalidUserDetailsError',
        message: errorMessage
      })
    }

    // Create user
    let user: User = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    }

    // Save user to database
    try {
      await firebaseUserRepo.save(user);
    } catch (err) {

      // Log this to monitoring or logging plugin but don't return
      // the backend error to the client.

      return res.status(500).json({
        message: 'Unexpected error occurred'
      })
    }

    return res.status(201).json({
      type: 'CreateUserSuccess',
      message: 'Success'
    })
}
```

What's wrong with this? Well, there's nothing really *wrong* with this of course. The code works. However, the only way for us to test this would be to perform a *black-box test*: an End-to-End test. Why? Because in order to set up this test, we need to bring an entire Express.js webserver with us, connections to a real firebase instance, and we can only validate the *application logic* through response codes.

While I believe E2E testing should be a part of your testing strategy, I don't think it should *be* your testing strategy.

Let's now discuss the path to fixing this.

## Architectural patterns

In [Part VII - Architecture Essentials](https://wiki.solidbook.io/Part-VIII-Architecture-Essentials-1a37541c710145829b79f9d2814946fc) from solidbook.io, we learn about **architectural styles** and **architectural patterns**.

Architectural styles are general overarching ways in which you can construct your application to help you solve a particular architectural challenge. The three main ones being *structural*, *message-based*, and *distributed* architectures.

It's kind of like how we have *design patterns*. Where we typically think of design patterns as these things that help us solve challenges at the class level, **architectural styles and their patterns help us solve problems at the architectural level**.

Architectural challenge? What's the challenge we're facing here?

The challenge 95% of us who are building non-trivial production applications are tasked with is not only how to encode these business rules within software effectively, but to do so in a way that we can verify that they work, and that we can safely change those rules later on down the road.

> In other words, the challenge is that we have **strict testing requirements**.

Which architectural pattern is specifically meant to help us solve the strict testing requirement problem? Ah yes, the layered architecture.

## A layered architecture

The solution to our testing problem is a *structural* architectural style called the layered architecture.

If you're a regular reader of this blog, you're likely already familiar with it, perhaps by the name of a hexagonal architectural, the onion architecture, or the famous clean architecture.

For those uninitiated, the main idea is that you separate the concerns of your application into layers:

- A layer for domain logic
- One for application
- One for infrastructure
- And an adapter layer which merely describes *abstractions* that make it possible for your infrastructure to hook into your application layer code using [dependency injection](https://khalilstemmler.com/articles/tutorials/dependency-injection-inversion-explained/)

![img](https://d33wubrfki0l68.cloudfront.net/ad571d3ba8d30be4c645962d7e1920666329f6eb/639ae/img/blog/software-architecture-design/app-logic-layers.svg)

Core code corresponds to the domain, application, and adapter[2](https://khalilstemmler.com/articles/test-driven-development/how-to-test-code-coupled-to-apis-or-databases/#fn-2) layers while infrastructure corresponds to the infrastructure layer.

### Benefit — testing options

The primary benefit of this type of separation is that we *give ourselves* a lot more [testing options](https://wiki.solidbook.io/25-Testing-Strategies-0794bd15f6324a6d90558c3819cf0630/).

Before, if we wanted to write our [acceptance tests](https://wiki.solidbook.io/22-Acceptance-Tests-7bf96fa035694e329455c11c740ab9a7), we'd have to write them in a sort of E2E-test style, bringing all of our databases, services, and real-world APIs along for the ride, maybe even playing with *real money* or something.

Instead, if we want to write our acceptance tests as *unit tests*, we have the option for that now.

For a [use case test](https://khalilstemmler.com/articles/test-driven-development/use-case-tests-mocking/), we can mock and stub out dependencies to infrastructure and just focus on testing the application core — make sure that it fails when it should, that it attempts to save to the database, that it attempts to make a call to an external API, or delete something when it *should* — but without actually *really* making that happen.

Then if we want to test that our infrastructure *does work*, we can test that separately in integration tests. This is just a part of a larger testing strategy. But alas — now we have options.

Let me show you how I'd probably rewrite and acceptance test this feature using the layered architecture pattern.

### Demonstration

I'd start with the BDD-style Given-When-Then test.

```gherkin
# modules/users/useCases/createUser/createUser.feature
Feature: Create user

Scenario: Creating a user
  Given I provide valid user details
  When I attempt to create a user
  Then the user should be saved successfully 

Scenario: Invalid password
  Given I provide an invalid password
  When I attempt to create a user
  Then I should get an invalid details error 
```

Then I'd write the test:

```typescript
// modules/users/useCases/createUser/createUser.spec.ts
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { IUserRepo } from '../../repos/userRepo';
import { CreateUser, CreateUserResult } from './createUser'
import { UserRepoSpy } from '../../testObjects/userRepoSpy'

const feature = loadFeature(path.join(__dirname, './createUser.feature'));

defineFeature(feature, test => {
  let result: CreateUserResult;

  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;

  let createUser: CreateUser;
  let userRepoSpy: UserRepoSpy;

  beforeEach(() => {
    createUser = undefined;
    userRepoSpy = undefined;
  })

  test('Creating a user', ({ given, when, then }) => {
    
    given('I provide valid user details', () => {
      // Arrange
      email = 'khalil@khalilstemmler.com';
      password = 'hello'
      firstName = 'khalil'
      lastName = 'stemmler';

      userRepoSpy = new UserRepoSpy([]);

      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      // Act
      result = await createUser.execute({ email, password, firstName, lastName });
    });

    then('the user should be saved successfully', () => {
      // Assert
      expect(result.type).toEqual('CreateUserSuccess');
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(1);
    });

  });

  test('Invalid password', ({ given, when, then }) => {
    given('I provide an invalid password', () => {
      email = 'khalil@khalilstemmler.com';
      password = ''
      firstName = 'khalil'
      lastName = 'stemmler';

      userRepoSpy = new UserRepoSpy([]);

      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      result = await createUser.execute({ email, password, firstName, lastName });
    });

    then('I should get an invalid details error', () => {
      // Assert
      expect(result.type).toEqual('InvalidUserDetailsError')
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(0);
    });
  });
});
```

And then I'd write the implementation of the *use case* (worrying about the integration tests later):

```typescript
// modules/users/useCases/createUser/createUser.ts
import { Result } from '../../../../shared/core/result';
import { UseCase } from '../../../../shared/core/useCase';
import { Email } from '../../domain/email';
import { FirstName } from '../../domain/firstName';
import { LastName } from '../../domain/lastName';
import { Password } from '../../domain/password';
import { User } from '../../domain/user';
import { IUserRepo } from '../../repos/userRepo';

type CreateUserInput = {
  email: string;
  password: string;
  firstName: string; 
  lastName: string;
}

type CreateUserSuccess = {
  type: 'CreateUserSuccess'
}

type AlreadyRegisteredError = {
  type: 'AlreadyRegisteredError';
}

type InvalidUserDetailsError = {
  type: 'InvalidUserDetailsError';
  message: string;
}

type UnexpectedError = {
  type: 'UnexpectedError'
}

export type CreateUserResult = CreateUserSuccess 
  | AlreadyRegisteredError 
  | InvalidUserDetailsError
  | UnexpectedError;

export class CreateUser implements UseCase<CreateUserInput, CreateUserResult> {
  private userRepo: IUserRepo;

  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute (input: CreateUserInput): Promise<CreateUserResult> {

    // Check to see if already registered
    const existingUser = await this.userRepo.findByEmail(input.email);
        
    // If already registered, return AlreadyRegisteredError
    if (existingUser) {
      return {
        type: 'AlreadyRegisteredError'
      }
    }

    // Validation logic
    let emailOrError = Email.create(input.email);
    let firstNameOrError = FirstName.create(input.firstName);
    let lastNameOrError = LastName.create(input.lastName);
    let passwordOrError = Password.create(input.password);

    let combinedResult = Result.combine([ 
      emailOrError, firstNameOrError, lastNameOrError, passwordOrError 
    ]);

    if (combinedResult.isFailure) {
      return {
        type: 'InvalidUserDetailsError',
        message: combinedResult.errorValue()
      }
    }

    let userOrError = User.create({
      email: emailOrError.getValue() as Email,
      password: passwordOrError.getValue() as Password,
      firstName: firstNameOrError.getValue() as FirstName,
      lastName: lastNameOrError.getValue() as LastName
    });

    if (userOrError.isFailure) {
      return {
        type: 'InvalidUserDetailsError',
        message: userOrError.errorValue()
      }
    }

    let user = userOrError.getValue() as User;

    // Save user to database
    try {
      await this.userRepo.save(user);
    } catch (err) {

      // Log this to monitoring or logging plugin but don't return
      // the backend error to the client.

      return {
        type: 'UnexpectedError'
      }
    }

    return {
      type: 'CreateUserSuccess'
    }
  }
}
```

There are many nuances in this improved version. Read about [Use case Tests](https://khalilstemmler.com/articles/test-driven-development/use-case-tests-mocking/) or check out [the YouTube video for this article](https://www.youtube.com/embed/ajfZqzeHp1E) for a more detailed breakdown.

## Conclusion

To recap, we learned that:

- The big problem with testing code that relies on databases, APIs, the file-system, or anything infrastructural is that we often *couple our core code* — the actual application core, the essential complexity — to our *infrastructural code*.
- Architectural styles and patterns are solutions to common architectural problems.
- The reason the layered architecture is so helpful for testing is that that it allows us to use dependency inversion to separate core code from infrastructure code. This gives us testing options. We can then develop a testing strategy that works.
- One way to acceptance test your features is to use a [Use ], by using a Use Case test, which is able to test the application core without relying on infrastructure — and that's very handy because it enables us to exhaust all of the success and failure states without needing to bring slow database connections or network requests along for the ride.

## FAQ

### Question: Do I have to do this?

Do I *have* to do this to test my backend code? Of course not. If you're building something super simple like a CRUD app, a proof of concept, or just exploring, I don't think you need to get to this level.

You can always just merely black-box test your entire backend, meaning — from the API, you just send it HTTP requests and assume that things work properly if your database get saved with the appropriate records.

This does, however, leave a lot of gaps in our testing capabilities.

For example, how exactly would you be able to verify that a confirmation email was sent when it should have been? You can't exactly programmatically log into your Gmail account to find that out.

I think you normally want a mixture of this black-box testing — testing from the outside, and some white-box testing, testing from the inside. Having both is a part of a healthy testing strategy on any software you intend on maintaining for an extended period of time.

### Question: Is this just on back-end or does this apply to front-end too?

You can also decouple the layers of your front-end code as well.

I've written a little bit of philosophy on [how this would work in the front-end via Client-Side Architecture Basics](https://khalilstemmler.com/articles/client-side-architecture/introduction/), and while I sometimes use these techniques, it depends on the testing requirements.

For example, if you're building what I call a *list/detail-view application* where all you really have to do is fetch data and present it, then no - I don't think this is entirely necessary. Your front-end testing strategy could just be to perform E2E tests and that's it (though I'd advise writing these tests in as BDD-acceptance-test-style as possible).

However, if you're building something very complex, like a digitial audio workstation in your browser, and there's a lot of logic that cannot be tested by merely perceiving and clicking, then yes, you're going to want to enforce a more rigid set of architectural layers for unit testing application or domain logic as well.

So ultimately, it depends on your testing requirements. How rigid are they? What's your testing strategy?

### Question: What about testing React components? How do you test them?

Let's apply the same philosophy.

1. Understand what it is that we'd like to test
2. Develop a testing strategy
3. Separate core code from infrastructure code

It depends on what you'd like to do. If you'd like to test your pure react components with unit tests, then yes — we'll want to enforce some level of separation, especially if it relies on infrastructure like Apollo Client or an HTTP-enabled service class or React hook that fetches data from a RESTful API.

If you don't care so much about testing your React components, and you care more about testing the features of the application from a user level (very common for view/list-detail applications), this calls for E2E tests. And it doesn't call for a strict decoupling of core from infrastructure. Go right ahead and write your E2E tests on *top* of your React code. Even better, *start* by [writing your E2E tests using the Page Object pattern](https://wiki.solidbook.io/26-The-Walking-Skeleton-a8bec641f8544b0aa1645f7290e93579#use-page-objects-to-write-declarative-e2e-tests), and then write the minimum required React code to make your E2E tests pass.

------

1. People seem to have different opinions on what a unit test *is* and *is not*. I do not believe that testing a component which contains other components disqualifies my test from being a unit test. For example, if I wanted to test a pure React component, like `Table` and it was decomposed into smaller sub-components for purely cosmetic reasons like `TableRow` and `TableColumn`, I still believe testing `Table` is a valid unit test. Why? Because I believe unit tests are more about if we're testing core code or infrastructure code. If we test code that relies on databases, network requests, the filesystem, or **even the system clock**, we are no longer testing units - we are testing integrations. Integrations between what? Between code *you wrote* (core) and code *someone else wrote* (infrastructure). This is the strategy we use for acceptance testing as [use case tests](https://khalilstemmler.com/articles/test-driven-development/use-case-tests-mocking/).

   ↩

2. Technically, you can say the adapter layer is a core layer because it doesn't contain any infrastructural concerns. It's completely comprised of abstractions. I like to think of it as a bridge between core and infrastructure.

   ↩

------

### Discussion

Liked this? Sing it loud and proud 👨‍🎤.

[![img](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTYxMiwxMTYuMjU4Yy0yMi41MjUsOS45ODEtNDYuNjk0LDE2Ljc1LTcyLjA4OCwxOS43NzJjMjUuOTI5LTE1LjUyNyw0NS43NzctNDAuMTU1LDU1LjE4NC02OS40MTEgICAgYy0yNC4zMjIsMTQuMzc5LTUxLjE2OSwyNC44Mi03OS43NzUsMzAuNDhjLTIyLjkwNy0yNC40MzctNTUuNDktMzkuNjU4LTkxLjYzLTM5LjY1OGMtNjkuMzM0LDAtMTI1LjU1MSw1Ni4yMTctMTI1LjU1MSwxMjUuNTEzICAgIGMwLDkuODI4LDEuMTA5LDE5LjQyNywzLjI1MSwyOC42MDZDMTk3LjA2NSwyMDYuMzIsMTA0LjU1NiwxNTYuMzM3LDQyLjY0MSw4MC4zODZjLTEwLjgyMywxOC41MS0xNi45OCw0MC4wNzgtMTYuOTgsNjMuMTAxICAgIGMwLDQzLjU1OSwyMi4xODEsODEuOTkzLDU1LjgzNSwxMDQuNDc5Yy0yMC41NzUtMC42ODgtMzkuOTI2LTYuMzQ4LTU2Ljg2Ny0xNS43NTZ2MS41NjhjMCw2MC44MDYsNDMuMjkxLDExMS41NTQsMTAwLjY5MywxMjMuMTA0ICAgIGMtMTAuNTE3LDIuODMtMjEuNjA3LDQuMzk4LTMzLjA4LDQuMzk4Yy04LjEwNywwLTE1Ljk0Ny0wLjgwMy0yMy42MzQtMi4zMzNjMTUuOTg1LDQ5LjkwNyw2Mi4zMzYsODYuMTk5LDExNy4yNTMsODcuMTk0ICAgIGMtNDIuOTQ3LDMzLjY1NC05Ny4wOTksNTMuNjU1LTE1NS45MTYsNTMuNjU1Yy0xMC4xMzQsMC0yMC4xMTYtMC42MTItMjkuOTQ0LTEuNzIxYzU1LjU2NywzNS42ODEsMTIxLjUzNiw1Ni40ODUsMTkyLjQzOCw1Ni40ODUgICAgYzIzMC45NDgsMCwzNTcuMTg4LTE5MS4yOTEsMzU3LjE4OC0zNTcuMTg4bC0wLjQyMS0xNi4yNTNDNTczLjg3MiwxNjMuNTI2LDU5NS4yMTEsMTQxLjQyMiw2MTIsMTE2LjI1OHoiIGRhdGEtb3JpZ2luYWw9IiMwMTAwMDIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiMwMTAwMDIiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+Cg==)Share on Twitter](http://twitter.com/share?text=How to Test Code Coupled to APIs or Databases&url=https://khalilstemmler.com/articles/test-driven-development/how-to-test-code-coupled-to-apis-or-databases/&via=khalilstemmler)

### 7 Comments

Commenting has been disabled for now. To ask questions and discuss this post, [join the community](https://discord.gg/TnqMR2P2rV).

Pavlo

2 years ago



"...two types of code: core **core** and infrastructure code" - **core code**)



Elliot

2 years ago



Nice article



Jack

2 years ago



Love it!

Is there any release data for the DDD nodejs course? ;)



Miklos

2 years ago



Nice article!

Would it not be better to pass the strong types to the use case as input as opposed to mapping them from primitive/weak types? That would align with the parse/don't validate approach and also make testing cleaner. You'd no longer need to test simple data parsing behavior and could focus on purely what the app layer needs to do -> fetching/persisting/returning results.



Mas

a year ago



Good article. You describe how you would decouple the infrastructure from the core code and how you can test the core code independently from the infrastructure code using unit tests. When it comes to the testing the infrastructure you talk about using integration tests. How would you go about integration testing the infrastructure? Would these be testing the infrastructure independently of the core code, but start up a live instance of the external service your adapting i.e. a db? Or would it be more black boxish and for example testing the useCase but with the non-test implementations of the abstractions i.e. repositories? This is something I've found hard to find reference for online especially in the context of DDD and typescript.



Kerry

a year ago



**Mas**

The advice I normally follow would be to spin up a live version of your database, which could be in a container, as the database can be considered as an implementation detail because it is not a part of your application's observable behavior. This means that its database cannot normally be accessed without going through your application. For things that are observable from the outside such as a third-party service or something that is hard to run live then you could use a mock server like Wiremock.



Kerry

a year ago



For React applications I've found that React Testing Library + Mock Service Worker provides an excellent way to write UI tests that are fast, easy to maintain, and less brittle than traditional e2e tests.



### Stay in touch!

Enjoying so far? Join 15000+ Software Essentialists getting my posts delivered straight to your inbox each week. I won't spam ya. 🖖

Get notified

![img](https://d33wubrfki0l68.cloudfront.net/136b30aa6dcc1e2bcf190c846279aecd30e6cb0a/d0a1b/static/khalil-headshot-fecbe8f1d39b9e2b0ae79cc0005e0efb.png)

### About the author

Khalil Stemmler,
Software Essentialist ⚡

I'm Khalil. I turn code-first developers into confident crafters without having to buy, read & digest hundreds of complex programming books. Using Software Essentialism, my philosophy of software design, I coach developers through boredom, impostor syndrome, and a lack of direction to master software design and architecture. Mastery though, is not the end goal. It is merely a step towards your Inward Pull.