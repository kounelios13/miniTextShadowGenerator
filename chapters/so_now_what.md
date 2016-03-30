# So now what?
Once you have everything installed everything needed you can create a text shadow generator like this:


```var generator=new TextShadow("#sample");```

But wait?What is #sample?Every text shadow generator must be hosted somewhere in the page.So "#sample" is an id of an html element which will host our generator.Beware that everything inside "#sample" will be erased after the generator is created.Don't worry.It will be saved inside the generator.You will be able to restore it.We will talk about it in an other chapter.But wait.The above code creates a simple text shadow generator without buttons.

![empty generator](images/empty_generator.png)

That means that you have to create your own buttons to use all the functions/methods of a TextShadow object. There is a solution to this problem.
Each TextShadow object constructor accepts an array of default buttons as second parameter.But what are those buttons?

Each TextShadow has 6 built in buttons which you can use if you don't want to create your own buttons.Here is the list

 * 0: activateGenerator
 * 1: deactivateGenerator
 * 2: resetGenerator
 * 3: addToFavourites
 * 4: showFavourites
 * 5: removeFavourites

 So you choose the numbers for the buttons you want to add and pass them as an array to the constructor like this:

 ```var generator=new TextShadow("#sample",[0,1,2]);```
 
 This is what the above code looks like:
 ![3buttons](images/3buttons.png)
