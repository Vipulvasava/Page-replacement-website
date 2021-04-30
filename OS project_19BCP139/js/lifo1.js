$(document).ready(function(){
    com=[];
    faults=[];
    flag=0;
    $("#btn1").click(function(){
        if(flag==0){
            flag=1;
            document.querySelector(".btn1").textContent="Hide Graph";

            document.querySelector("#graph").innerHTML="<h5>Graph to check Belady's Anomaly</h5>";

            var can=document.createElement("canvas");
            can.setAttribute("id","myChart");
            document.querySelector(".chart-container").appendChild(can);
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: com,
                    datasets: [{
                        label: 'No. of Faults',
                        data: faults,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: { 
                        duration: 5000,
                        //xAxis: true,
                        yAxis: true,
                    },
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'No.of Frames',
                                fontColor: "white"
                            },
                            gridLines: {
                                display: false,
                                color: "gray"
                            },
                            ticks: {
                                fontColor: "white",
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'No. of Faults',
                                fontColor: "white"
                            },
                            gridLines: {
                                display: false,
                                color: "gray"
                            },
                            ticks: {
                                fontColor: "white",
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }]
                    }
                },
            });
            document.querySelector("#last").innerHTML="<li>Belady's Anomaly does not exist for the set of frames entered.</li>";
        }
        else{
            document.querySelector(".btn1").textContent="Show Graph";
            document.querySelector("#graph").innerHTML="";
            document.querySelector(".chart-container").innerHTML="";
            document.querySelector("#last").innerHTML="";
            flag=0;
        }
        //$("#chart").slideToggle("slow", "linear");
    });

    var btn=document.querySelector(".submit");

    btn.addEventListener("click", function(){
        document.querySelector("#carouselExampleIndicators").classList.remove("d-none");
        document.querySelector("#carouselExampleIndicators").innerHTML=document.querySelector(".hidden2").innerHTML;
        var frames=document.querySelector("#frames");
        var str=document.querySelector("#istring");
        var inner=document.querySelector(".carousel-inner");
        var ol=document.querySelector("ol");
        com=frames.value.split(" ");
        var pages=str.value.split(" ");
        var n=pages.length;
        faults=[];

        for(k=0;k<com.length;k++){
            var li=document.createElement("li");
            if(k==0){
                li.classList.add("active");
            }
            li.setAttribute("data-target","#carouselExampleIndicators");
            li.setAttribute("data-slide-to",k);
            ol.appendChild(li);
        }

        for(var k=0;k<com.length;k++){
            var m=parseInt(com[k], 10);
            var item=document.createElement("div");
            item.classList.add("carousel-item");
            if(k==0){
                item.classList.add("active");
            }
            inner.appendChild(item);
            var ul=document.createElement("ul");
            ul.innerHTML="<h5>Summary</h5>";
            item.appendChild(ul);
            var li=document.createElement("li");
            li.textContent="Total frames: "+com[k];
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Algorithm: LIFO";
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Total number of input frames: "+pages.length;
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Sequence of pages: "+str.value;
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Does LIFO suffer from Belady's Anomaly? No";
            ul.appendChild(li);

            var h=document.createElement("h5");
            h.textContent="Visualization";
            item.appendChild(h);

            var hh=document.createElement("h6");
            hh.textContent="For No. of Frames = "+m;
            item.appendChild(hh);

            var tab=document.createElement("table");
            item.appendChild(tab);
            var col=document.createElement("tr");
            tab.appendChild(col);
            var head=document.createElement("td");
            head.innerHTML="<strong>No.</strong>";
            head.classList.add("tbl-header");
            col.appendChild(head);
            var head=document.createElement("td");
            head.innerHTML="<strong>Page</strong>";
            head.classList.add("tbl-header");
            col.appendChild(head);

            for(var i=0;i<com[k];i++){
                var head=document.createElement("td");
                head.innerHTML="<strong>Frame</strong>";
                head.classList.add("tbl-header");
                col.appendChild(head);
            }
            var head=document.createElement("td");
            head.innerHTML="<strong>Hit</strong>";
            head.classList.add("tbl-header");
            col.appendChild(head);
            var head=document.createElement("td");
            head.innerHTML="<strong>Replaced Page</strong>";
            head.classList.add("tbl-header");
            col.appendChild(head);

            var inst=[];
            var hits=0;
            var miss=0;

            for(var i=0;i<n;i++){
                var hit=0, v="-";
                var col=document.createElement("tr");
                tab.appendChild(col);
                var head=document.createElement("td");
                head.textContent=i+1;
                col.appendChild(head);
                var head=document.createElement("td");
                head.textContent=pages[i];
                col.appendChild(head);
                var idx=inst.indexOf(pages[i]);
                if(idx==-1){
                    if(inst.length<m){
                        inst.push(pages[i]);
                    }
                    else{
                        v=inst[m-1];
                        inst[m-1]=pages[i];
                    }
                    miss++;
                }
                else{
                    hit=1;
                    hits++;
                }
                for(var j=inst.length-1;j>=0;j--){
                    var head=document.createElement("td");
                    head.textContent=inst[j];
                    if(j==inst.length-1 && hit==0){
                        head.style.background="#ff1a1a";
                    }
                    else if(j==idx){
                        head.style.background="#009900";
                    }
                    col.appendChild(head);
                }
                for(var j=0;j<m-inst.length;j++){
                    var head=document.createElement("td");
                    head.textContent="-";
                    col.appendChild(head);
                }
                var head=document.createElement("td");
                if(hit==1){
                    head.textContent="Yes";
                }
                else{
                    head.textContent="No";
                }
                col.appendChild(head);
                var head=document.createElement("td");
                head.textContent=v;
                col.appendChild(head);
            }
            var ul=document.createElement("ul");
            ul.innerHTML="<h5>Observations</h5>";
            item.appendChild(ul);
            var li=document.createElement("li");
            li.textContent="Total references: "+n;
            ul.appendChild(li);

            var li=document.createElement("li");
            li.textContent="Number of hits: "+hits;
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Number of faults: "+miss;
            faults.push(miss);
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Hit rate: "+hits+"/"+n+" = "+(hits/n)*100+"%";
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Fault rate: "+miss+"/"+n+" = "+(miss/n)*100+"%";
            ul.appendChild(li);
        }

        document.querySelector("#btn1").innerHTML="<button><span>Show Graph</span></button>";
        document.querySelector("#btn1 button").classList.add("btn1");

    });
});