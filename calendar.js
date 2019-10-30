	var CALENDAR = function () { 
	    var wrap, label,  
	            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		//my stuff
		var pickedDate;
		
		
		function getPickedDate(){
			var formTag = $("#input_data");
			var picked_date = document.getElementById("last_cycle");											
			//picked_date.bind("click", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });       
			var tag1  = formTag.find("#last_cycle");
			var tag2= $("last_cycle");	
			var tag3 = $("#last_cycle");	
			var val = picked_date.value;
			var val1 = tag1.value;
			var val2 = tag2.value;
			var val3 = tag3.value;
			var date = new Date(val);
			return date;
		}
		//end lz stuff
 
	    function init(newWrap) { 
				wrap     = $(newWrap || "#cal"); 
			label    = wrap.find("#label"); 
			wrap.find("#prev").bind("click.calendar", function () { switchMonth(false); }); 
			wrap.find("#next").bind("click.calendar", function () { switchMonth(true);  }); 
			label.bind("click", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });        
			label.click();
 
			//pickedDate = getPickedDate();
	    } 
 
	    function switchMonth(next, month, year) { 
				var curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10); 
			month = month || ((next) ? ( (curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1 ) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1 )); 
			//year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11))
			year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);
			
			if (!month) { 
				if (next) { 
					if (curr[0] === "December") { 
						month = 0; 
					} else { 
						month = months.indexOf(curr[0]) + 1; 
					} 
				} else { 
					if (curr[0] === "January") { 
						month = 11; 
					} else { 
						month = months.indexOf(curr[0]) - 1; 
					} 
				} 
			}
			
			if (!year) { 
				if (next && month === 0) { 
					year = tempYear + 1; 
				} else if (!next && month === 11) { 
					year = tempYear - 1; 
				} else { 
					year = tempYear; 
				} 
			}
			
			calendar =  createCal(year, month); 
	        $("#cal-frame", wrap) 
	            .find(".curr") 
	                .removeClass("curr") 
	                .addClass("temp") 
	            .end() 
	            .prepend(calendar.calendar()) 
	            .find(".temp") 
	                .fadeOut("slow", function () { $(this).remove(); }); 
 
	        $('#label').text(calendar.label);
	    } 
 
	    function createCal(year, month) { 
			
			//{ 
				//calendar : function () { /* returns a jquery object of the calendar */ }, 
				//label    : "Month Year" 
			//}
			
			var day = 1, i, j, haveDays = true,  
	        startDay = new Date(year, month, day).getDay(), 
	        daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
	        calendar = [];
			
			if (createCal.cache[year]) { 
				if (createCal.cache[year][month]) { 
					return createCal.cache[year][month]; 
				} 
			} else { 
				createCal.cache[year] = {}; 
			}
			
			i = 0; 
			while (haveDays) { 
				calendar[i] = []; 
				for (j = 0; j < 7; j++) { 
					if (i === 0) { 
						if (j === startDay) { 
							calendar[i][j] = day++; 
							startDay++; 
						} 
					} else if (day <= daysInMonths[month]) { 
						calendar[i][j] = day++; 
					} else { 
						calendar[i][j] = ""; 
						haveDays = false; 
					} 
					if (day > daysInMonths[month]) { 
						haveDays = false; 
					} 
				} 
				i++; 
			}
			/*
			if (calendar[5]) { 
				for (i = 0; i < calendar[5].length; i++) { 
					if (calendar[5][i] !== "") { 
						calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>"; 
					} 
				} 
				calendar = calendar.slice(0, 5); 
			}
			*/
			
			/*
			for (i = 0; i < calendar.length; i++) { 
				calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>"; 
			}*/
			
			
			pickedDate = getPickedDate();
			var pDay = pickedDate.getDate();
			var pMonth = pickedDate.getMonth();
			var pYear = pickedDate.getFullYear();
			//var cycle = $("#cycle");
			//.value;
			var cycle = document.getElementById("cycle").value;
			//var period = $("#period").value;
			var period = document.getElementById("period").value;
			var constructedCal = ""
			for (i = 0; i < calendar.length; i++) { 
				constructedCal += "<tr>";
				
				for (j = 0; j < calendar[i].length; j++) {
					
					var dayOfMonth = calendar[i][j];
					var date = new Date(year,month,dayOfMonth);
					var utc = Date.UTC(year,month,dayOfMonth)/(1000*60*60*24);
					var pUTC = Date.UTC(pYear,pMonth,pDay)/(1000*60*60*24);
					//var tag = $('td');
					
					var tag = "<td";
					if (calendar[i][j] == undefined || calendar[i][j]=="")
						tag += " class=\"nil\" ";
					
					var diff = (utc - pUTC +cycle*10)%cycle;
					if (diff == 0)
						tag += " class=\"picked\" ";
					if (0 < diff & diff < period) {
						tag += " class=\"period\" ";
					}
					if (cycle-18 <= diff & diff <= cycle-12 & diff!=cycle-14) {
						tag += " class=\"fertile\" ";
					}
					if (diff == cycle - 14)
						tag += " class=\"ovulation\" ";
					tag += ">" ;
					if (calendar[i][j] != undefined)
						tag += calendar[i][j];
						//tag.addClass("picked");
					tag += "</td>"
					constructedCal += tag;									
					//calendar[i][j] = tag;					
									
				}
				
				constructedCal += "</tr>";
			}
			//calendar = constructedCal;
			//calendar = "<table class=\"curr\"><tbody>"+constructedCal+"<tbody></table>";
			
			calendar = $("<table>" + constructedCal + "</table>").addClass("curr"); 
			//calendar = $("<table>" + calendar.join("") + "</table>").addClass("curr"); 
		 
			$("td:empty", calendar).addClass("nil"); 
			// highlight the current day (today)
			if (month === new Date().getMonth()) { 
				$('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today"); 
				
			} 
			// my stuff, to highlight picked date
			
			if (month === pickedDate.getMonth() && year === pickedDate.getFullYear()){
				$('td', calendar).filter(function () { return $(this).text() === pickedDate.getDate().toString(); }).addClass("picked"); 
			}
			//end my stuff
			createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year }; 
		 
			return createCal.cache[year][month];
 
	    } 
	    createCal.cache = {}; 
	    return { 
	        init : init, 
	        switchMonth : switchMonth, 
	        createCal   : createCal 
	    }; 
	};