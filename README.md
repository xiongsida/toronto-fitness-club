# Toronto Fitness Club Website

Happy to have you here! You can watch this vedio https://youtu.be/UzKjZbF1dp4 to experience our website, or you can clone the repository locally and run the project as the instructions below.

## How to Run Our Project:

1. Clone the repository from github.

2. Get your own Google API key and update PF/PB/PB/PB/setting.py and PF/app/src/TFCConfig.json with your API key to use some functionalities compatible with Google map in our website.

3. Run the startup.sh under PF folder to initiate the project. It will create vitual environment and install all needed python packages for backend project; and install all nodes modules for frontend project. 

4. Run the run.sh to run the project. The backend project will run at your localhost port 8000 and frontend project will run at port 3000.

5. You can use our Toronto Fitness Club website at http://localhost:3000/ .

6. You can use our admin panel at http://localhost:8000/admin/ ; there is a admin user whose username is "Admin" and password is "Adminpass", you may also create a superuser (admin) yourself.

7. To shutdown the server, you need terminate the run.sh and kill the the process run on port 8000 as well.



## Website Functionalities:

#### Users:

1. Users can sign up, log in, log out, and edit profile information, including first and last name, email, avatar, and phone number.

2. Users can see sorted studios based on geographical proximity to a specific location, including his/her current location, a click pinpoint on map, or a valid input address. 

3. Users can see details of studios, which contain the general information of that studio, along with its images, address, and a link to get the directions. The direction origin will be automatically set as the users' click on map, or input address, or user's own location.

4. Users can see the class schedule of a specific studio. Classes will appear in the order of their start time (from now), and the class information will be shown. Past or cancelled classes should not be listed. 

5. Users can enrol/drop a class (either one instance or all future occurrences) that has not started yet and has not reached its capacity. This can only happen if users have an active subscription.

6. Users can view their class schedule and history as well.

7. Users can use search functionality and powerful filters to find studios or classes based on their preference.

8. Users can subscribe to one of our fitness plans; the first payment is made immediately after subscription, and each upcoming payment will be automatically made in the beginning of their period. Users can also cancel or update current or upcoming subscription plan. In case of cancellation, all class booking after the current billing period will be invalid.

9. Users can update my credit/debit card information, see payment history as well as future payments.


#### Website admin:

1. Website admin can create/edit/delete studios. A studio has a name, address, geographical location, postal code, phone number, and a set of images.

2. Website admin can update the amenities of a studio (type and quantity).

3. Website admin can create/edit a class in a specific studio. A class has a name, description, coach, a list of keywords (e.g., upper-body, core, etc.), capacity, and times. Times indicate the recurring instances of the class. For example, a HIIT session is held on Mondays from 8:00- 9:00am. To simplify the concept of recurring classes, all classes have a mandatory "end recursion" date. For example, a HIIT session will be held each Monday at 8am until December 30, 2022. 

4. Website admin can edit/cancel a specific class; either one instance or all the future occurrences of the class.

5. Website admin can create/edit/delete the gym subscription plans (e.g., 14.99$ per month or $149.99 per year).



## Highlights:

1. Our studios are smoothly and fastly sorted based on the geographic proximity to a specific location. We hava three ways to achieve this, including user's current location, a click pinpoint on map, or a valid input address; and we make these smooth and compatible with google map using React hooks. Besides, the backend implementation of sorting is fastly done on the level of database level, using django model objects "annotate" and "F" function to build a virtual column, which is a tricky and elegant way to achieve this.

2. Our studio filters each can support multiple choices, and all filters are combinable to each other. This is achieved in backend by a customized filiter class extended from some class in django_filters.

3. Our classes are recurring events. A group of recurring class will be automatically creaetd if the website admin creates a parent class under a studio. Details are in Backend_Models_Documentation.pdf under the PF folder.

4. Exploring our website is delightful. We have a beautiful UI and smooth UX. You can watch this video to virtually experience our website: https://youtu.be/UzKjZbF1dp4 .
