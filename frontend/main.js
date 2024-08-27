const App = () => (
    <div>
        <div id="topbar">
            <span><h1>Fitness Logger</h1></span>
        </div>  

        <div id="profile">
            <img src="img1.jpg" alt="Profile Photo" id="profile-photo" />
            <div id="profile-content">
                <p id="username">John Doe</p>
                <a href="#">Sign out</a>
            </div>
        </div>

        <span id="quote1">
            <p>"Nothing will work unless you do."</p>
        </span>

        <div id="recent">
            <p>Recent Workout..</p>
        </div>

        <span id="add_workout">
            <a>Add Today's Workout</a>
        </span>

        <div id="goals">
            <p>Goals</p>
        </div>

        <span id="add_goals">
            <a>Add Goals</a>
        </span>

        <span id="quote2">
            <p>"All progress takes place outside the comfort zone."</p>
        </span>

        <div id="metrics">
            <p>Personal Metrics</p>
        </div>

        <span id="add_metrics">
            <a>Add Personal Metrics</a>
        </span>

        <span id="quote3">
            <p>"Excuses don't burn calories."</p>
        </span>


    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
