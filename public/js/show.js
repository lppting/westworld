$(function(){
	function showData(){
		$.ajax({
		    url:"http://192.168.11.249:8060/js_show",
		    type:'GET',
		    timeout:30000,
		    success:CallBack,
            dataType:'json'
	    });
	    
	}
	function CallBack(tt){
		    var d = eval(tt)
		    t_in.innerHTML = d.temperature_1 + " \r ";
		    t_out.innerHTML = d.temperature_2;
		    h_in.innerHTML = d.humidity_1;
		    h_out.innerHTML = d.humidity_2;
		    in_light.innerHTML = d.intensity_1
		    out_light.innerHTML = d.intensity_2
		    temp.innerHTML = d.realtime.temp;
		    hum.innerHTML = d.realtime.sD;
		//    ele.innerHTML = d.solarele;
		//    azi.innerHTML = d.solarazi;
		    weather.innerHTML = d.realtime.weather;
		    pm25.innerHTML = d.pm.pm25+"μg/m³";
		    pm10.innerHTML = d.pm.pm10+"μg/m³";
		    so2.innerHTML = d.pm.so2+"μg/m³";
		    no2.innerHTML = d.pm.no2+"μg/m³";
		    co.innerHTML = d.pm.co+"μg/m³";

	    }
	$(showData)
    setInterval(showData, 10000);
});
