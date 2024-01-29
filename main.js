// main.js
import { Template } from 'meteor/templating';

Template.register.events({
  'submit #registrationForm'(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const role = event.target.role.value;

    // Insert user into collection
    Meteor.call('users.insert', email, role);

    // Clear the form
    event.target.email.value = '';
    event.target.role.value = 'admin';
  },
});

Template.home.helpers({
  users() {
    return Users.find();
  },
});

Meteor.methods({
  'users.insert'(email, role) {
    Users.insert({
      email,
      role,
      status: 'Pending',
    });
  },
});

Meteor.startup(() => {
  // Code to run on server startup
  if (Meteor.isServer) {
    // Define a simple collection to store users
    Users = new Mongo.Collection('users');
  }
});

// Add to main.js
Template.register.events({
    // ...
  
    'submit #loanRequestForm'(event) {
      event.preventDefault();
  
      const amount = event.target.amount.value;
  
      // Insert loan request into collection
      Meteor.call('loans.insert', amount);
  
      // Clear the form
      event.target.amount.value = '';
    },
  });
  
  Template.loanRequests.helpers({
    loanRequests() {
      return Loans.find({ status: 'Pending' });
    },
  });
  
  Meteor.methods({
    'loans.insert'(amount) {
      Loans.insert({
        amount,
        status: 'Pending',
      });
    },
  
    'loans.approve'(loanId) {
      Loans.update(loanId, { $set: { status: 'Approved' } });
    },
  });

  // Add to main.js
Template.adminDashboard.helpers({
    approvedLoans() {
      return Loans.find({ status: 'Approved' });
    },
  });
  
  Template.loanRequests.events({
    'click .approveLoan'(event) {
      const loanId = $(event.target).data('id');
      Meteor.call('loans.approve', loanId);
    },
  });
  

  // Update events in main.js
Template.register.events({
    'submit #registrationForm'(event) {
      event.preventDefault();
  
      const email = event.target.email.value;
      const role = event.target.role.value;
      const isBorrower = role === 'borrower';
  
      // Insert user into collection
      Meteor.call('users.insert', email, role);
  
      // Insert loan request for borrowers
      if (isBorrower) {
        const amount = event.target.amount.value;
        Meteor.call('loans.insert', amount);
      }
  
      // Clear the form
      event.target.email.value = '';
      event.target.role.value = 'admin';
      if (isBorrower) event.target.amount.value = '';
    },
  });
  
  

