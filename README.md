# Employee Management System
This is a sample application for Employee Management System.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Setup Instructions

1. **Install Node.js**  
   Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Angular CLI**  
   Verify that you have the latest version of Angular CLI installed. If not, run the following command to install it:
   ```
   npm install -g @angular/cli@latest 
   ```

3. **Install Git CLI**

    Ensure you have Git installed. You can download it from  http://git-scm.com.

4. **Clone the Repository**
    
    Once Git is installed, clone this repository to your local machine:
    ```
    git clone 
    ```

5. **Open the Project in Your IDE**
    
    Open the cloned repository in your favorite IDE (e.g., Visual Studio Code).

6. **Install Dependencies**

    Open the command terminal from the repository folder and run:
    ```
    npm install
    ```
# Run the Application

1. **Run the Backend API**

    Start the backend API using Visual Studio or your preferred method.

2. **Run the Development Server**

Run the following command to start the development server:
    ```
    ng serve
    OR
    npm run start
    ```
    Navigate to http://localhost:4200/ in your browser. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Application Folder Structure

- **app**
  - **components**
    - **confirmation-dialog:** A reusable dialog component to get confirmation from the user before performing delete operations.
    - **employee-list:** The primary component to display the employee list.
    - **edit-employee-dialog:** A component to create or edit a employee.
	- **home:** A component for home page.
	- **login:** A component for login form.
  - **models**
    - **api-response:** Model for mapping API responses.
	- **authenticate-response:** Model for mapping authentication responses.
    - **employee-data:** Model for mapping employee data.
	- **login-data:** Model for user login data.
    - **modal-data:** Configuration model for dialog data.
  - **services**
	- **auth.guard:** Guard to protect routes requiring authentication.
    - **employee-service:** Service for managing employee operations.
    - **http-interceptor:** Interceptor for handling HTTP requests and responses.
    - **notification-service:** Service for managing user notifications.
	- **storage-service:** Service for abstracting localStorage access.
	
- **environments**:
    - **environment.development.ts:** Development environment configuration.

## Current Design Support for Scalability

1.  **Separation of Concerns:**
    - We have separate code base for frontend and backend application.

2. **Cloud Support**
    - Both Angular and .NET has good support for cloud deployments.
