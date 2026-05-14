# AI LOG

## Debug Tailwind CSS not working

**Tool used:** Claude

**Date:** 22 April 2026

**Purpose:** To debug why Tailwind CSS is not working in the project.

**Outcome:** First I had added my test button color wrong, but after fixing that it still didn't work. Claude then told me to check if my server was running. It was, but i had to restart it for the changes to work. After that, the Tailwind CSS worked as expected.

---

## Fix nav not refreshing on login/logout

**Tool used:** Claude

**Date:** 24 April 2026

**Purpose:** To fix the navigation bar not refreshing on login/logout.

**Outcome:** It explained to me that the renderNavbar() was only called once in main.js but not mentioned anywhere else. When login/logout changes the hash, the router's hashchange handler updates #app content but never re-renders the navbar. It suggested adding it to the handleRoute() function in router.js.

---

## Lucide icons not showing

**Tool used:** Claude

**Date:** 24 April 2026

**Purpose:** Trying to find out why some icons showed while others didn't.

**Outcome:** The icons didn't show because because createIcons() was only called once in main.js, and not after the route changed. When the route changed, the new content was added to #app but the icons were not re-rendered. So it recommended me to call my icons one more time, like I already did with the navbar. I added an icon.js file to easily import it when it needs to be used.

---

## Fix countdown timing issue

**Tool used:** Claude

**Date:** 27 April 2026

**Purpose:** Explain countdown timer not showing on cards after moving the countdown logic to home.js

**Outcome:** It first found it confusing that I had commented out my old countdown logic in listingCard.js, but then it explained that the countdown logic was moved to home.js. Also I had forgotten to change the setInterval to tick every seconds and not every minute (I want minutes in the end but for testing I wanted to see it change more often). It reccomended me to change endsIn to '' and fix the countdownListings to call an update function immediately before starting the interval, so that the countdown would show up right away instead of waiting for the first tick.

---

## Issues moving pagination controls from home.js to paginationControls.js

**Tool used:** Claude

**Date:** 27 April 2026

**Purpose:** Explain how to move the pagination controls from home.js to a separate component file while keeping it functional.

**Outcome:** I just had to move my function I already had set up in home.js and update my call to pass pagination. The reason it also didn't work, as I found out myself after trying this before asking, was that I had forgotten to export the function. I was importing it but not exporting it.

---

## Check link configuration

**Tool used:** Claude

**Date:** 28 April 2026

**Purpose:** Listing card linked to page not found, and I was pretty sure I had linked it correctly and wanted to see if I had done something wrong.

**Outcome:** I just forgot to change my reggex in routes.js. Link was perfectly fine.

---

## Countdown timer not showing on listing page

**Tool used:** Claude

**Date:** 29 April 2026

**Purpose:** Explain why the countdown timer was not working on the listing page after I moved the countdown logic to home.js, where it worked, and then to listing.js.

**Outcome:** The countdown timer was not showing because I had moved the countdown logic to home.js and then to listing.js, but I had forgotten to remove the old countdown logic from home.js. The setTimout was going before the HTML string was injected into the DOM and listing.id was listingData.id in the listing.js file.

---

## useModal export syntax error

**Tool used:** Claude

**Date:** 30 April 2026

**Purpose:** Explain the export syntax error I got when I exported the function.

**Outcome:** I had exported it as a default export but I was importing it as a named export. I just had to change the import to match the export syntax.

---

## useModal errors

**Tool used:** Claude

**Date:** 30 April 2026 - 1 May 2026

**Purpose:** Some problems I wanted explained:

- How to close the modal on backdrop click. My clicks didn't want to work on the background, only on the close button.
- My form wouldn't submit, so I asked what was wrong.
- My tags went through, but didn't show up in the edit listing modal, so I wanted to know why.
- Delete listing was working but gave an error, I asked it to explain why.

**Outcome:** Answers to the problems:

- To close the modal on backdrop click, I could add an event listener to the backdrop element. This made it really easy for me to figure out how toadd the same functionality but for the escape key.
- It explained to me that I had forgot to set attribute type to be button and eventlistener on the requested submit.
- The tags was now showing since I was missing splitting the string into an array at each comma.
- I had written 200 instead 204 as the success status code for delete listings. I changed it easily and fixed the toasts for both success and error.

---

## Search refresh and results

**Tool used:** Claude (plan mode)

**Date:** 2 May 2026

**Purpose:** I had already set up my search and it worked, but my refresh would not work no mather what I added. So I asked Claude to help me plan what needed to go where.

**Outcome:** I had added it to my handleSearch function, but needed to add it my setTimeout right benith it. Now both clicking the x and removing the search input text, refreshes the page and shows all listings again.

---

## Move bid listing into a component

**Tool used:** Claude

**Date:** 4 May 2026

**Purpose:** I just wanted to move it fast, I did know how to do it but wanted to save some time.

**Outcome:** It moved it to the folder I told it was going to use and imported the countdown with it since it was set up to work with this card. I knew how to do it but it was just faster to ask it to do it for me. It tried to move more, but It made it worse. So I had to go back where I started and adjust it myself. So I didn't really save that much time.

---

## Debug form submission in edit profile modal

**Tool used:** Claude

**Date:** 5 May 2026

**Purpose:** I got a "SP2-helene-syre/#/profile/syre_helene:1 Form submission canceled because the form is not connected" warning in the console when I clicked on cancel. I wanted to know why this was happening and how to fix it.

**Outcome:** The cause was i had forgotten to add type="button" to my cancel button, I in fact had forgotten to add a type at all. By default, buttons in a form are of type "submit", so when I clicked the cancel button, it was trying to submit the form, but since the button was not connected to the form. It also gave me a lot of other bugs it recommended me to fix, but I had not come that far yet. I therefore asked it to make me a plan, and it gave it to me. This plan was not how I wanted to make my modal, so i just added the type="button" to my cancel button and fixed the rest myself.

---

## Tabs on profile bug

**Tool used:** Claude

**Date:** 7 May 2026

**Purpose:** I tried to follow this tutorial https://www.youtube.com/watch?v=5L6h_MrNvsk for my tabs. It didn't work as I wanted to and it added weird effects to my tabs. So I asked Claude to explain to me what was happening and how to fix it.

**Outcome:** It just made it worse. For some reasoon, the content got added the tab button style on only one content, but Claude made it work on both contents. I explained I wanted it to make the tabs have the classes and the content to be hidden when inactive. But it just added new classes and didn't fix anything. So I removed everything and started over myself.

---

## Trouble with bid history and bid amount

**Tool used:** Claude

**Date:** 8 May 2026

**Purpose:** I noticed yesterday a problem with the array in one bid history. I could not understand or find what was wrong with it, so I asked Claude to explain what could be wrong. (I also got an answer from my teacher on this after this, and I kinda got the same answer but more detailed).

**Outcome:** First Claude wanted to change how I sort my order that was the reason. But I explained it was still wrong, and it looked at it again and did see that it did not sort my order, and changed it to so it finds the highest bid amount directly instead of just taking the last one. Now the bid amount also changed correctly. I did change some of it.

---

## Prevent duplicate error messages in register/login

**Tool used:** Claude

**Date:** 12 May 2026

**Purpose:** Since I got sick today my head couldn't remember where I added the removable part of the error messages, so I asked Claude to explain to me where it was.

**Outcome:** It explained to me to just add form_error to my error message container and it was fixed.

---
