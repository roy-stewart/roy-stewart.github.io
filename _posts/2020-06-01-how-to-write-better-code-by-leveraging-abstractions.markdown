---
layout: post
title:  "How to write better code by leveraging abstractions"
date:   2020-06-01 22:01:00 -0400
author: Roy Stewart
---
Perhaps one of the most common issues that many programmers face is that they write code that is literal and explicit rather than abstract and conceptually. When we utilize abstractions to write code we can better communicate out intention, make it easier to change our code base, and spend less time worrying about irrelevant details. This principle can be applied to a plethora of different situations, languages, and tools.

Discussions about abstraction are often targeted at the system architecture and how different components in a system relate to each other. In this post I wanted to discuss abstractions at a much more granular level. The goal of this post is to show you how small, seemingly negligible, abstractions at the function and variable level can serve to create clean, readable, and flexible code. In order to demonstrate common applications I will primarily focus on use cases that deal with collections. While the code samples in this article are written in java the principles that they demonstrate are applicable in any language.

An example of a very common, and often overlooked, example of abstraction is when we use collection objects. Let's say that you are writing a function, called <code>findEvenNumbersFrom</code>, that takes a collection of integers, known as <code>availableNumbers</code>, and returns a Set of all even numbers that were in <code>availableNumbers</code>. Many developers have established a bad habit of declaring the type of <code>availableNumbers</code> to be whatever type of collection that they intend to pass as that parameter, so the method signature may look something like

```java
public Set<Integer> findEvenNumbersFrom(List<Integer> availableNumbers) { ... }
```

or

```
public Set<Integer> findEvenNumbersFrom(Set<Integer> availableNumbers) { ... }
```

<p> And our example method's body may look something like this.</p>

```
final Set<Integer> evenNumbers = new HashSet<>();
for (final Integer number: availableNumbers) {
    if (number % 2 == 0) {
        evenNumbers.add(number);
    }
}
return evenNumbers;
```

Notice how the body of the method would look identical whether the type of <code>availableNumbers</code> was a Set or a List. In fact, we could write a function with this body and either of the signatures above and they would function identically.

The biggest issue with declaring either a Set or a List as the parameter in the function above is that we are then prohibited from passing the other type to this method. To work around this, we then must either declare a method overload each both type and duplicate the implementation or we must always convert to the supported collection type before passing in the desired value.

Think about it, how many times have you seen a function that takes a parameter of type List but you want to pass a Set as a parameter? Perhaps that function in question makes just as much since when given a Set as it does when given a List. In fact, if you were to cover up the List and Set variable declarations you might not even be able to tell which type the parameter is.

The best solution to this problem is to accept a parameter of type <code>Iterable</code>. Our <code>findEvenNumbersFrom</code> method above would read the exact same if the parameter were an <code>Iterable</code> since it is not dependent on the values being ordered or distinct. When we use this least specific interface possible it allows us to pass multiple types of collections or iterables without any unnecessary type conversions or duplication of code.

This less restrictive type allows us to have a looser coupling between a method and the context in which it is called. With our new parameter type we can use this method in more locations or even change the types in the calling context with relative ease.

This usage of a less specific interface also acts as documentation for our function. It informs others that this function does not require that the input collection be sorted in a given order or contain distinct values. It informs other readers that our function will behave the exact same regardless of the type of collection that it receives. Our method override work around that was mentioned above does not accurately convey this to others. The method overrides indicate that either the method only makes since when given certain collection types or that the method has different implications or behavior for each type of collection.

You can also protect your code from the functions that it consumes by using the least specific interface that fits your needs. Let's look at an example of how this can protect your code from changes and help to decouple it from the code that it depends on. The code below represents a method that finds and returns all factors of an integer.

```
private List&lt;Integer> factorsOf(int number) { ... }
```

Let's say that we were tasked to write a function that will print every factor of a number to the console. Our code may look something like the following.

```
public void printFactorsOf(final int number) {
    final Iterable&lt;Integer> factors = factorsOf(number);
    factors.forEach(System.out::println);
}
```

Now, let's say that it was determined that the <code>factorsOf</code> method should only return each factor once. Another developer then changed the return type of the <code>factorsOf</code> method to be a Set to ensure that the returned collection only contains one instance of each factor. Had we declared the variable <code>factors</code> to be of type <code>List</code> then when the return type was changed we would also have to change the type of our variable. Since we instead declared our variable to be of type <code>Iterable</code> we don't have to worry about also changing the type of <code>factors</code> and our code still functions as intended.

This level of abstraction has uses on the returning end of functions as well. If we specify that a function returns the highest level interface that reasonably makes since then we can encapsulate the return value freely changed the implementation without having to worry about breaking any code that uses this function. This gives your function the flexibility to change design decisions or implementations at will.

Let's say that we have built a custom Iterable, called DataRecordIterable, to iterate over data records in a system. We have a function that creates a new instance of DataRecordIterable. The declaration may look like the following.

```
public DataRecordIterable createIteratorForCurrentRecords() { ... }
```

While the above code does in fact work, you should ask yourself an important question. Would I still be able to use this function and would it make sense if it returned <em>some super class here</em>? We should return the least specific type that contains the desired functionality. Perhaps this DataRecordIterable contains some valuable connection information or metadata. In that case we might very well want to return the type DataRecordIterable. On the other hand, if this return value is only intended to be used to iterate over the records in a system, then we should likely return an Iterable rather than specific the implementation.

The reason that the less specific type is desirable compared to a more specific one is because it decouples any code that calls this function from the implementation details of the function itself. A good example of why this is beneficial is if we want to change the type of iterable that we return. Perhaps we adopt a new library that contains an iterable that would accomplish the same job as DataRecordIterable or if we decide to deprecate DataRecordIterable because it was slow or the system that it works with is no longer supported. In either of these cases we can adjust our implementation without having to worry about breaking any code that utilizes this function.

This change to how you write code may seem unnecessary or trivial but it carries significant benefits. Try it for yourself and see how much it can improve you and your team's development experience.

How do you feel about this advice? Have you ever worked on a project that strongly does or doesn't follow this principle? Feel free to drop a comment in the discussion section below with your own personal experiences and opinions.
