# Nexus Fashion

This is a multi-vendor boutique app, built with react native and expo.
It is meant to be hooked up with blockchain functionality, with which users can connect metamask and pay for goods and services

However, the mobile version of metamask seems to have an issue with connecting to testnets, and only natively supports mainnets.

A possible fix for this would be to build a webfacing application to go hand in hand with this app, so that it automatically navigates, and has users pay for things using the web version of metamask.

## Entry And screens
The entry point of the app is the ./App.js

Asides this, we have the ./screens foder which contains the
- Homepage
- Boutique screen (which shows the profiles of each boutique)
- Preparing order screen (whish shows a nice little animation as the payment aspect gets processed)
- Basket screen (which shows the basket containing all that the user has picked)
- Delivery screen (this one is incomplete, but is supposed to feature a map and how long it takes orders to get to the buyers
)
- Connect wallet screen (this one pops up when a user attempts to pay witout connecting their wallet)

### Note
- Check the package.json file to see the modules and packages this project is built with