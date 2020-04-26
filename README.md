# InstaPool - Google Action Side

## Demo

<img src="Demo/Drive planning.png" alt="Store" width="293.0" height="472.13" />     <img src="Demo/assistant status.png" alt="Store" width="233.1" height="478.26" />     <img src="Demo/assistant request.png" alt="Store" width="233.1" height="478.26"  />

Need an instant carpool for an unscheduled event? Or, are you driving somewhere that you can give a ride to some people? Use Google Assitant or iOS app to request an instant carpool.

InstaPool was a Hackathon project, more info [here](https://devpost.com/software/instapool). This repository is for the Google Action side using Jovo Framework. You can find the Dialogflow backup [here](https://github.com/mmohades/InstaPool-Action/blob/master/DialogFlow%20Backup/InstaPool%2C%20DialogFlow%20backup.zip).



## Inspiration
It’s not a secret that cars do a lot of damage to our environment. They produce tons of toxic pollutants and chemicals that result in greenhouse emissions, acid rain, climate change, and significant water and air pollution.
This environmental damage also influences people’s health ranging from minor headaches to cancer to birth defects. We are also wasting lot of time and money by spending time in traffic as a result of having so many cars with just one person in it. That is why we decided to find a way to facilitate carpooling by giving people the opportunity to look for others who are going in the same direction and do a ride sharing with them. In this way, we are reducing the number of cars in the street which results in less air pollution and traffic.

InstaPool
## What it does
This app helps people who are almost at the same location and have almost the same destination to find each other at the exact moment that the user requests for a ride. This is something that we do not see in similar apps like uber or lyft. One user can be the driver and the other can be the person who is looking for a ride.   After they have been matched with each other, they are able to send messages between themselves to plan for their ride.  
# How we built it
our primary database. The entire components are pushed and maintained in Docker containers. We built a native iOS app using Swift and their new UI framework, SwiftUI. The app is entirely asynchronous thanks to the Combine framework and the declarative design of SwiftUI.

## Challenges we ran into
We had some difficulties with geolocation and match the right driver and carpooler together. However, we managed to accomplish it.
## Accomplishments that we're proud of
We finished both a fully functional iOS app and a Google Action while considering the UX and UI. Also, InstaPool can significantly reduce the number of cars in the road, especially when a specific event is happening, like Nationals winning the world series since people can instantly find someone to carpool with.

## What we learned
We learned how to make a Google Action and use Google API for geolocation.

## What's next for InstaPool
We can implement more features for this app in the future to make it more convenient to use and then use it in small communities like a university.

