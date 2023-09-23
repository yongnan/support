# Advanced TypeScript Cheat Sheet for Types, Interfaces, Control Flow, and More…

[source](https://www.dhiwise.com/post/advanced-typescript-cheatsheet)

![logo](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/623d8cf285bb1c12332d0f10_Monogram%20(1).jpg)

## DhiWise

FEBRUARY 28, 2023

![image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/629da331efc23d1f7500f08b_(Medium)Advanced-TypeScript-Cheat-Sheet-for-Types%2C-Interfaces%2C-Control-Flow%2C-and-More_925X400.jpg)

Debugging and troubleshooting is the most annoying part of software development but TypeScript handles the inadequacies with grace. That’s why almost [60% of JavaScript developers use it and 22% of them wish to try it](https://2019.stateofjs.com/javascript-flavors/typescript/).

TypeScript which is often referred to as the superset of JavaScript has slowly gained the attention of many software organizations. After witnessing its benefits, software developers are incorporating the language into their tech stack.

This article will walk you through the Advanced TypeScript concepts and capabilities. So let’s dive in,

- **What is TypeScript?**
- **Advantages of TypeScript**
- **Advanced TypeScript cheat sheet
  — Types
  — Interfaces
  — Classes
  — Control Flow analysis**

![TypeScript](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a836c14e41253ddc70f077_1*GbllgGMEY_h9fZE8HQ5oBw.png)

‍

#### ‍**What is TypeScript?**

TypeScript is the strongly typed programming language developed and maintained by Microsoft. In Oct 2012, TypeScript was first introduced by Microsoft after two years of internal development.

It is a strict syntactical superset of JavaScript and adds optional static typing to the language. It allows developers to specify the variable type, function parameter, returned values, and object properties. The language compiles into JavaScript and the compiled output is pretty neat and readable that can be used wherever you want. The syntax has few similarities with the C#.

‍

#### **Advantages of TypeScript**

If you are a TypeScript user, you might have noticed that “*once you start using it, you will stay with it.*” Find out why it’s worth using TypeScript for programming:

1. Higher code stability due to strongly typed variables.
2. Strong tooling and community support.
3. Easy to understand and thus best for the growing team of developers.
4. It improves agility while refactoring and it’s better for the compiler to catch errors than wait until things fail during runtime.
5. By leveraging the power of TypeScript and Dependency injection we can efficiently avoid bugs through efficient testing and debugging.
6. With its auto-injection libraries, it makes the source code extremely maintainable and predictable.
7. TypeScript is compiled down to JavaScript code that runs on all the browsers.
8. With TypeScript, developers can write more clean, type-safe, and testable code with ease.

‍

#### **Advanced TypeScript cheat sheet**

TypeScript is a simple language and allows developers to express types in terms of other types. However, while performing the basic tasks, having a profound understanding of how TypeScript works are critical for unlocking its advanced functionality.

As we know more about TypeScript, we can utilize this knowledge to write cleaner and testable code. In this section, we are combining all the basic concepts of TypeScript and its advanced features in a single cheatsheet, so here we go.

##### ‍

#### TypeScript Primitive+Advanced Types

##### **Key points**:

- Think of Type as variables: the type can be created in the same way we create variables.
- TypeScript has lots of global types that can be used to perform common tasks.

##### **Common data types:**

- **Built-in type primitives:** boolean, string, number, undefined, null, any, unknown, never, void, bigint, symbol.
- **String:** Represents string values like “Hello, world”.
- **Number:** Represents all numbers including integers and floats. For example, 42 and 42.3 are both numbers.
- **Boolean:** Represents boolean values true and false.
- **Array:** Represents an array of numbers, strings, and so on. It can be represented as number[], string[].
- **any:** The type is used when you don’t want any type checking.

***Object Literal Type\***

In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through *object types*.

Syntax:

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a842d3812f5f843406e4e1_1*z7ihmMYD_ZKcaJLDyVlAQA.png)

[Object Literal Syntax](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

For Example:

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843584e412513f27c32aa_1*B2KfZwPJIOWLeFE0LKJxAA.png)

***Tuple Type\***

A tuple is a special-cased array with known types at specific indexes.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a84366bcd91a3b50028827_1*SRp3U6Exx_WkC4CGOV16RQ.png)

***Union Type\***

A union type describes a value that can be one of several types. It allows us to use more than one data type for a variable or a functional parameter.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843754d84a7ca9d47418a_1*b6CNy9N9jmQVP0-HvbzhXw.png)

***Intersection Type\***

The type combines multiple types into one(A way to merge or extend types).

Syntax:



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8438af3386f427c1d9ae7_1*EKET9ZWouDmv69TqiMfyHw.png)

For Example:



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843931524f0e278664386_1*_qar36djJ3bG8HmGyQK_cA.png)

***Type Indexing\***

A way to extract and name from a subset of a type.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843a30158f20ed38f94ec_1*YMCigHgX1QJRTzXLDv6iow.png)

***Type From Value\***

Reuse the type from an existing JavaScript runtime value via the typeof operator.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843af132411759d4fa624_1*9nXjHBiYBZd8CWyhXQiXFA.png)

***Type From Function Return\***

Reuse the return value from a function as a type.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843c93cae9013821e5d15_1*uzYVI1oNZ2QNl-25LcHDmA.png)

***Mapped Types\***

Acts like a map statement for the type system, allowing an input type to change the structure of the new type.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843d5812f5f329407423a_1*Dsj914NiGPPh4DOxk0jw5g.png)

***Conditional Types\***

It works as an “if statement” inside the type system. Created via generics, and then commonly used to reduce the number of options in a type union.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843e36a775a74e5e58fa5_1*zdU7Bujxybm1Ds5Qjhdzdg.png)

***Template Union Type\***

A template string can be used to combine and manipulate text inside the type system.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a843ef88071438eabdbab5_1*bJEY4nHbO7fQTVXNICMDmQ.png)

‍

#### Interfaces

##### **Key Points:**

- Used for type checking whether the object has a specific structure(shape) or not.
- Only contain the declaration of methods and fields but not implementations.
- Almost everything in JavaScript is an object and the Interface is built to match its runtime behaviour.
- Common built-in JS objects: Date, Error, Array, Map, Set, Regexp, Promise

***Common syntax\***



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a84412e22ab358e2360d6e_1*GeXJj9921t6_k1eGVIHVUw.png)

[Interface Syntax](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Generics\***

Declaring a type which can change in your interface.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8442a0158f24ca3902ad2_1*c9Cbb5Pas3Av8NZlagq2DQ.png)

[Generics in Interface](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

One can constrain what types are accepted into the generic parameter via the extends keyword.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8443c451a7e80e0d123e7_1*mhLPr28fh5As0IKpVv86fw.png)

[Set constraints on the type](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Overloads\***

A callable interface can have multiple definitions for different sets of parameters.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a844560cee97defb767de4_1*nsFyJhVHwqXyksqwPVsIqQ.png)

[Interface Overloads](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Extensions via merging interfaces\***

Interfaces are merged, so multiple declarations will add new fields to the type definition.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8446d812f5f7656076df2_1*4sTyyrwOVITQU7ZvCpyXAg.png)

[Merging Interfaces](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

‍

#### **Type vs Interface**

- Interfaces can only describe object shapes.
- Interfaces can be extended by declaring it multiple times
- In performance-critical types interface comparison checks can be faster.

#### TypeScript Classes

##### **Key Points:**

- TypeScript offers full support for the class keyword introduced in ES2015.
- As with other JavaScript language features, TypeScript adds type annotations and other syntax to allow you to express relationships between classes and other types.

##### ***Creating a Class Instance\***

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a844a2eacd49e596ba0d29_1*1Qps0OCxJkYv4a4lG9buPw.png)

[Class Instance](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

#### Private keyword **vs** Private fields

##### Private keyword:

The prefix private is a type-only addition and has no effect at runtime. So, when a transpiler converts TypeScript code to JavaScript, the private keyword is **removed**.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a844ce0cee97a07b76a572_1*yWvq_8OMDcRFM2ws2uVubw.png)

[Private keyword](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

Private fields:

\#private which is runtime private and has enforcement inside the JavaScript engine that is only accessible inside the class. The private fields remain private at runtime even after the TypeScript code gets converted to JavaScript by the transpiler.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a844f6c8fa83ea8af6afcf_1*qh_cI7W1jjG4GU9s3xAVVQ.png)

[Private fields](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***this parameter in the classes\***

The value of this parameter inside the function depends on how the function is called. This parameter can be used to bind function or arrow function.

We can add ‘this’ parameter to the method definition to statically enforce that the method is called correctly.

‍

***Type and Value\***

A class can be used as both a type and a value.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8451f451a7e832fd1ccb6_1*bcoK6nzEhrNWcr3oytSJpg.png)

[Class as a type and value](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

Here the first Bag is a Type and the second Bag is a Value, so be careful while using class.

***The common syntax used in Classes\***



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a845384b6f8b3c383b50e8_1*1dLsBwTVCaIdDpgncnG4tw.png)

[Common Class Syntax](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Generics\***

Used to declare the type that can be changed in the class method.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8455a812f5f518507cde1_1*_XIm65K4K54cjvkza7Zpdw.png)

[Generics in Class](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

‍

***Parameter properties\***

A specific extension to classes automatically set an instance field to the input parameter.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8457e0cee979bf176da0a_1*1MSv_-z5UsFIE7XVAvfQ8w.png)

[Parameter Properties in Class](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Abstract classes\***

A class can be declared as not implementable, but as existing to be subclassed in the type system. As can members of the class. The class which extends the abstract class must define all the abstract methods. We cannot create an instance of an abstract class.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a845930b20158efa0a9806_1*OahWxsx6Uu1o4lJa-T75pA.png)

[Abstract Class](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Static members\***

A static property and method are shared among all instances of a class. To declare a static property, you use the static keyword. To access a static property, you use the className.propertyName syntax.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a845aa0b2015fde60aac86_1*GV5LPYTae6tqRyLzFZT1pw.png)

Static property and method

Static and non-static fields with the same name can exist without any error.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a845c21524f0837e6843c6_1*RWnLQSQHaGD4kSBLb5AYyQ.png)

Static and non-static fields with the same name

#### **Control Flow Analysis**

[Control Flow Analysis](https://www.typescriptlang.org/play?ts=4.4.2#example/control-flow-improvements) is the core TypeScript feature that analyses your code to get the best type interface depending on the variable usage. CFA always takes a union and optimizes your code by reducing the number of types inside the union based on the logic in your code.

Though there are multiple ways to define functions that affect how TypeScript [narrows types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), most of the time it has been seen that CFA works inside the natural JavaScript boolean logic, but there are ways to define your own functions which affect how TypeScript narrows types.

‍

#### **If Statements:**

Most narrowing comes from expression inside the if statements where different type operators narrow inside the new scope.

***typeof operator (for primitives)\***



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a84612d3df9d60ad4f1b22_1*Fm6WZwQp4ptt391Y0ec_rg.png)

[typeof operator](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***instanceof operator (for classes)\***



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a846234d84a73b054939c1_1*-Z4z-2MV_wesJDCXgea3JQ.png)

[instanceof operator](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***“property” in the object (for objects)\***

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a84636e22ab33a903846fd_1*GxFHRyxVrL1KaTOOSls0zA.png)

[Property in the object](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***type-guard functions (for anything)\***

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8464f0158f22cb1930396_1*CcqOIPYocUPiQsm4sS_4ig.png)

[type-guard functions](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

#### **Expressions:**

Narrowing also occurs on the same line as code, while performing the boolean operations.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8466e4d84a73c4149801f_1*Bi_Tg2Sfp9rElirmmYO0lw.png)

[narrowing on the same line](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

##### **Discriminated unions/algebraic data types:**

Combining string literal types, union types, type guards, and type aliases to build an advanced pattern is called *discriminated unions*, also known as *tagged unions* or *algebraic data types*.

Discriminated Unions are the combination of three things:

- The Discriminant - Types that have a common literal (or enum) property
- The union - A type alias that takes the union of those types
- Type guard

In the following example, all the members of the union have the same property name, however, CFA can discriminate on that.



![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a846aebcd91a950f04f88a_1*hhvCvjcoFEnuOKEl0nI-Qg.png)

[Discriminated unions](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

#### **Assignment:**

***Narrowing types using ‘as const’\***

const assertion to narrow an object literal type to its element. The prefix *‘as const’* locks all types to their literal versions.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a846c63cae904488206136_1*AvS2GkcxtCGRE4JuSyEkuw.png)

*Narrowing types using ‘as const’*

***Tracking through the related variables\***

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a846dcd3df9d3dd84f1cab_1*Yopc_7Pegkiv47aUyimX1A.png)

[*Tracking through the related variables*](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

***Reassigning updated types\***

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a846ed3cae90a5d5207c39_1*aE4JcvLsRlZWvcxppx2INQ.png)

[Reassigning updated types](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

#### **Type Guards to perform runtime checks**

A function with a return type describing the CFA change for a new scope when it is true.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8471ac6b0f2ef56a81e23_1*YU-lpWGe1cQDGOO4gvEolg.png)

[Type Guards](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

#### **Assertion Function:**

A set of functions that throws an error when something unexpected happens

Following is a function describing CFA changes affecting the current scope, because it throws instead of returning false.

![Image](https://global-uploads.webflow.com/618fa90c201104b94458e1fb/62a8475e3c18d6054e356adc_1*Z8bM0S2Vlf57lpcDFpF7Zg.png)

[Assertion Function](https://media-exp1.licdn.com/dms/document/C561FAQF798Mf8kf_zg/feedshare-document-pdf-analyzed/0/1648650702078?e=2147483647&v=beta&t=_mkPePW3p4LIlL_23dhnLCjf0Q80DFEC4t6uB8kT5Jo)

If you find yourself having trouble with some of the concepts discussed above, try reading through the [TypeScript Documentation](https://www.typescriptlang.org/docs/) first to make sure you’ve got a solid understanding of all the basic and advanced concepts.



#### **Wrapping Up**

Most JavaScript developers are already in the affair with TypeScript as it is more reliable and easy to refactor. The above cheat sheet gives you quick access to all the TypeScript concepts.

But why are we sharing all this with you?

***At DhiWise we believe in empowering developers, no matter which technology or platform they are using. The platform already supports JavaScript and now it goes versatile in app development with the support for TypeScript.\*** 

Want to explore more about the amazing platform and its features?

Visit [DhiWise ](https://www.dhiwise.com/?utm_campaign=blog&utm_source=seo&utm_medium=website&utm_term=education&utm_content=advanced-typescript-cheatsheet)today and [sign up](https://app.dhiwise.com/sign-up?utm_campaign=blog&utm_source=seo&utm_medium=website&utm_term=education&utm_content=advanced-typescript-cheatsheet) to experience the perks of cleaner, customizable, and faster app development.