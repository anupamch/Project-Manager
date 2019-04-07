var round_datble=angular.module('round_table')

	round_datble.filter('itirator', function() {
        return function(input) {
			var lowBound, highBound;
            switch (input.length) {
            case 1:
               lowBound=1
			   highBound=input[0]
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound; i++)
                result.push(i);
            return result;
        	
        };
    });
	
	round_datble.filter('itiratorLeadZero', function() {
        return function(input) {
			var lowBound, highBound;
            switch (input.length) {
            case 1:
               lowBound=1
			   highBound=input[0]
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound; i++)
			{
				if(i/10==0)
				   j="0"+i
                result.push(j);
			}
            return result;
        	
        };
    }); 
    
    
    
    
    
    round_datble.filter('projectStatusText',function(){
	   return function(input){
	   	   var tText=""
	   	   switch (input) {
	            case 0:
	              tText="Not Started"
	              break;
	            case 1:
	              tText="Started"
	              break;
	            case 2:
	              tText="Complete"
	              break;
	            case 3:
	              tText="Stoped"
	              break; 
	            default:
	                tText= "Not Started";        
              
         }
         return tText; 
         
	   };	
	});
	
	round_datble.filter('dateFormat',function(){
	   return function(input){
	   	   var date=new Date(input)
	   	   var month=parseInt(date.getMonth())+1
	   	   var formated_date=date.getDate()/10<1?"0"+date.getDate():date.getDate()
	   	   var formated_momth=month/10<1?"0"+month:month
	   	   var formated=formated_date+"."+formated_momth+"."+date.getFullYear()
           return formated; 
         
	   }; 	
	});
	
	round_datble.filter('checkFileType',function(){
	   return function(filename){
	   	  
	   	  var image_ext = ["jpg", "jpeg", "bmp", "gif", "png"];  
	   	   var text_ext=["doc","docx","txt"]
	   	   var zip_ext=["zip","rar"]
	   	   var ext=filename.split('.');
	   	   ext=ext[ext.length-1]
	   	   
	   	   var filetype=""
	   	   if(image_ext.indexOf(ext)>-1)
	   	     filetype="fa-picture-o"
	   	      
	   	   else if(text_ext.indexOf(ext)>-1)
	   	      filetype="fa-file-text-o"
	   	   else if(zip_ext.indexOf(ext)>-1)
	   	       filetype="fa-file-archive-o"  
	   	            
           return filetype; 
         
	   }; 	
	});
	
	round_datble.filter('reverse', function() {
		  return function(items) {
		  	if(items=="" || items==undefined)return
		    return items.slice().reverse();
		  };
		});
	
	round_datble.filter('dateTimeFormat',function(){
	   return function(input){
	   	   var date=new Date(input)
	   	   var month=parseInt(date.getMonth())+1
	   	   var formated_date=date.getDate()/10<1?"0"+date.getDate():date.getDate()
	   	   var formated_momth=month/10<1?"0"+month:month
	   	   var hours = date.getHours();
	   	   var min=date.getMinutes()
	   	   var mid='am';
		   if(hours>12)
		   {
		         mid='pm';
		        hours=parseInt(hours)-12	
		   }
		   if(hours==12 && min>0)
		   {
		   	  mid='pm';
		   }
		   min=min/10<1?"0"+min:min
		    hours=hours/10<1?"0"+hours:hours 
	   	   var formated=formated_date+"."+formated_momth+"."+date.getFullYear()+"   "+hours+":"+min+mid
           return formated; 
         
	   }; 	
	});
	
	round_datble.filter('textShorter', function() {
		  return function(items) {
		  	if(items=="" || items==undefined)return
		  	var new_name=items
		    		  	
		  	 if(items.length>40)
		  	{
			   new_name=items.substr(0,10)+"..."+items.substr(items.length-10,10)	
			}
		    return new_name;
		  };
		});
	round_datble.filter('checkProfImage', function() {
		  return function(items) {
		    //console.log(items)
		  	var new_path="images/user.png"
		    		  	
		  	if(items!="" &&  items!=undefined)
		  	{
			   new_path="uploads/"+items
			}
		    return new_path;
		  };
		});	
		