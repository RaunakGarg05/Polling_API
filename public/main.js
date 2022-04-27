
const form = document.getElementById('vote-form');
var event;

form.addEventListener('submit', e=>{    
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:4000/polling',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});

fetch("http://localhost:4000/polling")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;
        let voteCounts = {
            After: 0,
            Before: 0,
        };
        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
            {}
        );
        let dataPoints = [
            { label: 'After 5pm', y: voteCounts.After },
            { label: 'Before 5pm', y: voteCounts.Before },
        ];  
        const chartContainer = document.querySelector('#chartContainer');
        if(chartContainer){
            document.addEventListener('votesAdded', function (e) { 
                document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
            });
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme4',
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();

    Pusher.logToConsole = true;
    var pusher = new Pusher('413b3ab19b7602c1f745', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('Polling-System');

             channel.bind('Voting', function(data) {
               dataPoints.forEach((point)=>{
                   if(point.label==data.os)
                   {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        document.dispatchEvent(event);
                   }
               });
               chart.render();
             });
        }
});