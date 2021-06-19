---
layout: post
title: "Automate the boring parts"
date: 2021-06-18 21:24:00 -0400
author: Roy Stewart
description: Are you tired of typing out repetitive commands or doing the same tasks over and over? If so, learn how you can use your shell environment to automate out the boring stuff so that you can instead focus on the exciting bits.
---

# Automate the boring parts
If you work in a technical field, such as software development, then you likely understand the pain of repetitive tasks. Its not fun, but sometimes you have to restart that local server or clear out a cache more than you would like, perhaps even multiple times a day. You didn't sign up for your job just to type out:

```
rm -r some/directory
rm -r another/directory/somewhere/else
rm -r yet/another/directory/with/a/really/long/file/path/that/you/forget/sometimes
```

Trust me, that last one is never fun. Sometimes you may even mistype the path and accidentally delete a similar directory right next to it. Ouch.

Well, luckily for you, there's a solution to that problem. Automate it with scripts. Yep, I want you to write code so that you can minimize the boring stuff and spend more time writing the code that you enjoy. Regardless of whether you are working on a Windows or Linux computer you can take advantage of simple scripts to automate out those parts that you wish never existed. Well, most of it anyway.

I'll be using powershell and Windows for this tutorial, but you can apply the same principles to your shell and Linux distribution of choice. The scripts, syntax, and environments may be a little different but the productivity gains are still incredible.

# Creating a collection of scripts
I've found that creating a dedicated directory for all of my common scripts helps to keep things organized and easy to access or update in the future. It also provides a cool shortcut that you can take advantage of. I'll go into more depth about that one later, but I'll let you know that it has to do with automating the detection and instantiation of your script aliases.

To start setting up your library of scripts you will want to start with a dedicated folder. I personally like to just create a subfolder under my user's folder called Scripts. Once I've got scripts folder setup I can then start adding my automation scripts. My personal favorite that I like to start with is a script called list-scripts.ps1. In powershell, this script usually looks something like this:

```
Get-ChildItem /path/to/dedicated-scripts -Filter *.ps1 | Foreach-Object {
    Write-Host $_.BaseName
}
```

This script is short and sweet, but incredibly useful. This script lists off the names of all my scripts in my scripts folder. I find this to be extremely useful when you forget which scripts you have on which computer or what you named that script that you only run about once a month. Its kind of like a help command for your personal scripts since it shows you what is available at your disposal.

Now that you have your first script, we can make it easy to call from anywhere by adding an alias for it. To do so we need first find the location of our profile powershell script. This is a special powershell script that is run as soon as you log in. If you open up a powershell terminal and type $profile it will print the file path to your account's profile script. Here you can add aliases or any other special start up code.

If you open this file in a text editor you can add an alias to your new powershell script &mdash; list-scripts. If you add the following line, after substituting the location of your new script, it will create a powershell alias for your script.

```
Set-Alias list-scripts /path/to/list-scripts.ps1
```

This allows you to essentially call this script as if it were a command line app from any location on your system. We can of course do this for every script that we create, but this process becomes tedious pretty fast. Instead, we can automate our automation and add a couple of lines to our powershell profile that will search for all scripts in our dedicated scripts folder and automatically create an alias for each. This code will look something like the following:

```
Get-ChildItem /path/to/dedicated_scripts -Filter *.ps1 | Foreach-Object {
    Set-Alias $_.BaseName $_.FullName
}
```

Once you add that code you can remove the alias that you had manually set up above &mdash; the foreach loop above sets it up for you. Now that we have a way to list all of our custom scripts and automatic detection for new ones, you can start to add your own personalized scripts to your folder. All that you have to do is run .$profile to reload new scripts and type out the name of your script to run it.

I'll likely be adding a collection of my most commonly used scripts to a repository on Github. Feel free to check out my profile and the repository to see if any of them may be useful to you. I'm also welcoming pull request for any generic scripts that you think may others may find useful. I'd love to see what other you find automation useful for in their life!