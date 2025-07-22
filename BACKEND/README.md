NEW UPDATES - july 14,2025

- 2 way sign-up - send email and password first and later is the user information
- updates the api
- fetch the backend apis using axios
- created a secureStorage for Tokens
- auth context for token also used for auto login deleting token and others
- updated authentication folder
- apply backend on signup and login (normal login)
- googleLogin partial yet since we where in development
- Update layout.js in authentication added initialRoute login
- Updated the handlesubmitFucntion in fillUp.js to send data in db
- updates rootNavigator in app/layout.js para mag show yung landing page pag first time gamitin ng user yung app
- Updates profile.js in TABS folder para mag fetch ng data sa db na ilalagay naten sa profileSection
- updates the profileSection component to display user name and profile pic gamit ung data na finetch sa profile.js in tabs

# NEW UPDATE JULY 17, 2025

- transfers backend update from frontent1.2 branch
- added function that handles
- updates api added profile upload and profile pic upload for edit profile
- pictures upload uploaded in cloudinary (cloud)
- updated editProfile.js I updates editProfileScreen, useEffect , pickImage, handlesubmit function
- added save button in editprofile.js
- user now can edit their profile and it save and reflects in profileScren.js
- added fields barangay in user Information

TODO: CONTINUE WORKING UPLOAD ITEMS

# NEW UPDATE JULY 19, 2025

- UPDATED ADDITEMS
- user can upload more images in one item integrated with backend
- remove static products and change to a real product
- in wishlist inupdate ko lang para mag accept sya ng array since many wish is allowed
- addedd api axios in BACKEND FILE much organize
- updated available screen , tradescreentabs, productlist
- update api backend
- TODO EDIT ITEM


# NEW UPDATE JULY 22, 2025
- add google authentication that supports native and Ios
- google logic is merged means they can use the gmail in normal login as well as google signup but it is sync
- added deep link cather which is email verifyer file - index.js
- Updated some backend code and api reset and forgot password
- blocked users who is not verified di sila makakalogin if di nila iveverify yung email - improvement more soon
- added native android folder and eas json


TODO : 
- edit Item screen
-  make restriction to users post item di sila mkakapag post item if di complete yung details nila sa profile since they can bypass the fillup screen and sign up as long as verified sila
- implement reset and forgot pass soon!!

!! TEST TOMMOROW the eas build apk or local testing via developer mode
- di mag wowork ang google signup and email verification sa expo go unless it is pkg
- error in frontend the eccommerce splash corrupted file daw based sa logs 