angular.module("EmployeeApp",[])

.controller("MainCtrl", function ($scope,webservice) {

    $scope.Employees = [];
    $scope.emp = {
        name:"",
        email:"",
        dob:"",
        dept:"",
        gender:""
    };
    getEmployees();
    
    
    // Save a new Employee
    $scope.addEmployee = function(emp){
       webservice.saveEmployee(emp,function(data){
           
           // refresh the employee table
           getEmployees();
           
           // clear the fields
           clear();
           
       },function(error){
           console.log(error);
       });  
    };
    
    // Open Employee in Edit mode 
    $scope.editEmployee = function(e){
        $scope.emp = angular.copy(e);
        $scope.emp.dob = new Date(e.displayDate);
        $scope.emp.dept = e.department;
    };
    
    // Update Employee 
    $scope.updateEmployee = function(e){
        webservice.updateEmployee(e,function(data){
           
           // refresh the employee table
           getEmployees();
           
           // clear the fields
           clear();
           
       },function(error){
           console.log(error);
       });  
    };
    
    // Delete Employee
    $scope.deleteEmployee = function(e){
        webservice.deleteEmployee(e,function(data){
           
           // refresh the employee table
           getEmployees();
           
           
       },function(error){
           console.log(error);
       }); 
    };
    
    // Get all the Employees
    function getEmployees(){
        webservice.getEmployees(function(emp){
            $scope.Employees = emp.data; 
            $scope.Employees.forEach(function(emp,i) {
              emp.displayDate = emp.dob.split('T')[0];
              var age = _calculateAge(new Date(emp.displayDate));
              $scope.Employees[i].displayDate = emp.displayDate;
              $scope.Employees[i].age = age;
            });
            
        },function(err){
            console.log(err);
        });
    };
    
    // Clear the input fields
    function clear(){
        $scope.emp.name = "";
        $scope.emp.email = "";
        $scope.emp.dob = "";
        $scope.emp.dept = "";
        $scope.emp.gender = "";
    };
    
    // Calculate the Age from DOB
    function _calculateAge(birthday) { 
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    
    

});

