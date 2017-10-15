angular.module("EmployeeApp")

.service("webservice",function($http){
    
    /** Save Employee
     * @param: employee details
     */
    
    this.saveEmployee = function(employee, callback, errcallback){
       $http({
            method:'POST',
            data:employee,
            url:"/api/save"
        }).then(callback,errcallback);
    };
    
    /** Get all Employees
     * @param: 
     */
    
    this.getEmployees = function(callback, errcallback){
       $http({
            method:'GET',
            url:"/api/view"
        }).then(callback,errcallback);
    };
    
    /** Delete an Employee
     * @param: 
     */
    
    this.deleteEmployee = function(e,callback, errcallback){
       $http({
            method:'DELETE',
            params:e,
            url:"/api/delete"
        }).then(callback,errcallback);
    };
    
    /** Update an Employee
     * @param: 
     */
    
    this.updateEmployee = function(e,callback, errcallback){
       $http({
            method:'PUT',
            params:e,
            url:"/api/update"
        }).then(callback,errcallback);
    };
    
    
});