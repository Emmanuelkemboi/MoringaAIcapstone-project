# React State Management Capstone Project  
*A beginner-friendly hands-on project demonstrating how to manage and share user data in React.*

---

## Overview of the Chosen Tech: React + State Management

This capstone focuses on **React**, a powerful JavaScript library for building dynamic user interfaces.

The goal of this project is to help beginners **understand how data (state)** flows between components in React using:
- **`useState`** hook for local component state  
- **Lifting state up** to share data between sibling components  
- **Props** for communication between parent and child  

You’ll build a **Create Account → Login** workflow where a user creates an account, the data & properties stored in state then used to manage the status and actions of the app during an account creation and a user login session

---

## Set Up Instructions

### Prerequisites
- Node.js ≥ 18  
- npm or yarn  
- Basic understanding of React fundamentals (components, hooks, props)

### 🛠 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Emmanuelkemboi/MoringaAIcapstone-project.git
      cd MoringaAIcapstone-project
2. **Access the minimal working example that demonstrates state management in react:**
   ```bash
   code .
  
3. **Install the project dependencies**
   ```bash
   pnpm install
4. **Run the Project in your local machine**
   ```bash
   pnpm run dev
**The app runs locally at:**
  ```bash
  http://localhost:5173/
```
## Result:
 You can access the login form →Enter your username & password → switch between login & signup. In this example of discussing state we focus on the **ability of the user to switch between a login form or a signup form, the ability of an application to switch messages in the login/signup process, the ability of an application to create a good user experience**. When the user already has an account, the **LoginForm is rendered** whereas when the user doesn't have an account, therefore he/she needs to create one the **SignUp form is rendered** in the page instead, this is only possible by the state `isAccount` which is initialized to false at first, to **track the having Account property** therefore rendering the SignUp form, If the user already has an account and clicks the `"Already have an account text?"`, It triggers the `setIsAccount` state setter function which switches the property of isAccount to true therefore rendering the LoginForm. This is only possible by lifting up the isAccount state upto the parent App.jsx component so that it can be accessed by other sibling component since state only flows downwards. 

 #### State managing the property of an application:
 The **isClicked** property/state is very essential in managing weather a button is clicked or not in both Login and signUp form, here It is used to manage our UI by guiding the user with instructive messages, like the signUp form once a user clicks the signup button, the `"creating account..."` text is displayed this is only possible by the changing the isAccount Property to true to conditionally render text in the button on an onclick event

 #### Prop drilling
 The only way the child components(Login and SignUp form) can change the isAccount state is by the parent(App.jsx) "giving them the authority to do so" by "drilling"/ passing down the state setter function `setIsAccount` this enables the login and signUp forms to be rendered or not.

### AI Prompts Used (Documentation Reference)
These are the conceptual prompts used to guide learning, not implementation directly to get code.
You can reuse them for classroom teaching or self-learning:
Learning Goal
Prompt
Local State
```bash
“I am a beginner using react for the first time and I want to Implement a feature in my App where the user can switch between having an account to login and not having an account to sign up, Please: 1. Show me what react feature in state I should implement 2. By the use of a minimal example show me how sate is shared between the parent and child components 3. Show me how a child component can switch state that is owned by a parent component”

Concept learnt: state-management

```
Prop Drilling
```bash
“What’s a cleaner way to share data across components?”
ContextAPI
```
Updating State
```bash
“How do I edit and reflect changes in real-time?”
State updates & re-rendering
```


## Learning Reflections
### State is the heart of React.
 Everything in the UI reflects your component’s state — change state → UI reacts.

### Data flow is unidirectional.
 State moves downward (from parent to child).
 Updates bubble upward (child → parent through callbacks).


### Prop drilling can become messy.
 Context or external state libraries (Redux, Zustand) solve this for larger apps.


### Editing and persisting state teaches immutability.
 Always create new state objects rather than mutating existing ones.



 ## Common Errors & Fixes
```bash
Cannot read property 'name' of null
```
Accessing state before it’s set
Add conditional rendering (user && user.name)
```bash
Inputs not updating
```
Not binding state correctly
Use controlled inputs (value + onChange)
```bash
Form reloads page
```
Missing e.preventDefault()
Always prevent default on form submit
```bash
State doesn’t update instantly
```
Async nature of setState
Don’t rely on immediate value after calling setter


### Reference Resources
Official Docs
- React Documentation (State & Lifecycle)


- React useState Hook



Recommended Tutorials
freeCodeCamp: React State Management Explained


W3Schools React State Tutorial


Scrimba React Course



 # License
MIT License © 2025 Emmanuel
