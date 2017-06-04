# Provider Swap
---

## Purpose
Gives Hungry Buffs providers a better way to swap hours, preferably in mobile app form.

## Primary Features
1. Provider accounts ```login/logout```
2. Set/Import weekly schedule
3. Mark shifts as up for grabs
4. Set times you're willing to cover
5. Suggest a mutual trade
6. See a feed of hours up for grabs & times that need to be covered

## Stretch Features
1. Import schedule directly from ```Driver``` app
2. Mobile app
3. Notifications when swaps are suggested or someone responds to a need
4. Automatically text dispatch
5. Coordination of alternative compensation

## Database Schema
**Users**

```
Primary Key
username - string
password - hashed string
profileUrl - string(url)
timestamps (created at)
```

**Time Blocks**

```
Primary Key
userID - FK references user id
startDate - timestamp
```

**Tradable shifts**

```
Primary Key
UserID - FK references user id
blocks - string (array with time block ids)
compensation - float (cash compensation)
```


