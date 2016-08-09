#Node.js Round 1
##Installation
Clone this repository and run
```bashp
npm install
```
Make sure to have both [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) installed.

##Usage
Because the [requirement](https://github.com/HQInterview/Nodejs-Round1#requirements) specify that order and payment have to be saved to the database.
You have to start mongoDB first by typing the following in the command-line.
```bashp
mongod
```

Then start the application
```bashp
npm start
```

Once the application show the message ``Application is listening at port 8080``
Open the browser and type the url
```
http://localhost:8080
```

##Test
All tests are written under [mocha](https://github.com/mochajs/mocha) testing framework.
To run test, run the following npm script:
```bashp
npm test
```

##Bonus Question
> How would you handle security for saving credit cards?

Please follow [PCI-DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard) compliance and you are good to go.
Specifically, follow the list in [PCI-DSS Quick Reference Guide](https://www.pcisecuritystandards.org/documents/PCI%20SSC%20Quick%20Reference%20Guide.pdf) on page 12-15.

##Design
Before realizing a software to take its shape, I prefer to understand the problem first.
Asses its feasability.
Come up with a design and break it down piece-by-piece until problem become less abstract and get more technical to the point that I'm ready to code that component.
However, I'm not a guy who just daydream about the design that seems to work only on paper neither a guy who rush to code and don't know what he suppose to do.
I wrote the design three pages on two A4 paper with pencil.
The design is later refined and shown in the later sections.
Let's digest the requirement first.

###Requirement Analysis
Compare requirement one-by-one.
* 1. is what libraries I must use (paypal-rest-sdk and braintree)
* 2. UI-specification (form with field ...)
* 3. expected output (success/error message and transactions in the database)
* (specification 3) Routing rules -> sounds too complicated than it should be -> let's make it simpler -> table should work

| Credit Card | Currency            | Payment Service          |
|-------------|---------------------|--------------------------|
| AMEX        | USD                 | paypal                   |
| AMEX        | EUR,THB,HKD,SGD,AUD | `<ERROR> allow only USD` |
| *           | USD,EUR,AUD         | paypal                   |
| *           | THB,HKD,SGD         | braintree                |

Where `*` means any type and `<ERROR>` means eror.
Other things are constraints -> irrelevant to the core problem for now.

###The Core
I am not going to use any UML for now because the problem is too abstract.
Let's take a look from the top-most view.
A single black box.

![overview](http://imgh.us/app_1.svg)

>Inward arrow means input.
>Outward arrow means output.

>Given an order to the system, it has to make a payment and output a response message in a form of web page.

Image above are digested from the requirement to what is the expected input and output.
Fortunately, the input and output are deterministic making the problem simpler otherwise we'll have to consult for more precise and clearer requirements.

Next, let's breakdown the `System` component.
We interest in what are those output are going to.
In this case, is there any external system that plays a role in the application.
What input/output they expect.
The process is the same but getting a little deeper.

![external](http://imgh.us/external_2.svg)

We identified that there are three external systems at play.
Now we can consider specific things like what database we should use.
What payment service we aim to provide and so on.
And consult their API documentation when those are decided.
At this level, we can write UML activity diagram specifying how those systems suppose to interact.
I'm too lazy to write it so I'll skip it.
However, I still recommend to use Use Case Diagram before preceeding to here.
It outlines users and external systems based on requirement without caring about input-output.
It is kinda overkill in my opinion and because the program does only one thing, make an order.

Let's breakdown ``Application`` component further.

![application](http://imgh.us/application.svg)

``Order System`` is the only system that the application contains.
It makes the payment to payment services and save whatever it responses to the database if the payment succeeds.

Inside the ``Order System``

![component](http://imgh.us/component_3.svg)

We see that we suppose to call braintree and paypal to charage money to their service.
Each of them have their own way of calling their service so we need a common interface that will make our job easier.
Which is why they all wrap in ``Payment Service``.

The input ``Order`` is broken down to card type and currency which will feed to ``PaymentGateway``.

* ``PaymentGateway`` receives card type, currency, and routing table.
It determines what payment service we should use.
* ``PaymentService`` is an interface to either paypal or braintree.
It encapsulates its implementation detail and gives us a nice and clean method to call.
* ``DecisionMaker`` decides what route to go in case of ``PaymentGateway`` gives out multiple routes.
It is neither an object nor component.
It is just a stub of code that get more spotlight than others.
I decide to embed it in ``PaymentGateway``.
But if we have a more complex logic to it.
We can extend this later.

The ``<Internet>`` oval reminds us that we need an internet connection, paypal and braintree sandbox account in order to succeeed.

We're alomost ready to code.
I can code each unit now if I want, but I still have an incomplete picture of all these things integrate together.
Let's make an Sequence Diagram and Class Diagram to see how are they incorporated and to see if we miss anything else.

![sequence diagram](http://imgh.us/Make_an_Order.png)
![class diagram](http://imgh.us/Order_3.png)

Classes in blue color are designed using [bridge design pattern](https://en.wikipedia.org/wiki/Bridge_pattern).
It helps encapsulate the implementation details where each unit can vary independently.

**FINALLY, We are ready to code.**

##What I apply for best practices
###Node.js
* All application's dependencies are installed with exact version number. Developers who cloned the repository will have the same repository state as others.
* All inside .js source code begins with ``'use strict';`` to make it fail fast and loud to silly programming bloopers such as not defining a variable before referencing it.
Good for server-side script, but not recommend on browser-side due to incompatability with certain browsers.
More info [here](http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it)
* All .js files don't use camel case naming convention so that requiring modules work on Windows, Mac, and Linux.
Windows is case-insensitive, Mac and Linux are case-sensitive when it comes to files.
Having files like ``fileA.js`` and ``filea.js`` in the same directory will work on Mac and Linux, but not Windows.
So I use '-' in file name to signify blank spaces.
* Assign required modules to a constant variable so that I don't accidentally assign it something else and cause undefined behaviour.
I simply just follow Node.js convention in their [documentation](https://nodejs.org/api/cluster.html#cluster_cluster).

