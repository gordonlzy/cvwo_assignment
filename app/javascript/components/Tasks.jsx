import React from "react";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }

  deleteTask(index) {
    const id = index;
    console.log(id);
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  editTask(index) {
    const id = index;
    const url = `/api/v1/edit/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { tasks } = this.state;
    
    const allTasks = tasks.map((task, index) => (
      <div key={index} className="col-md-6 col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{task.name}</h5>
            <p className="card-subtitle">{"Created: " + task.date_created}</p>
            <p className="card-subtitle">{"Due: "+ task.due_date}</p>
            {/* <Link
                to="/edit_task"
                
                className="btn btn-lg custom-button"
                role="button"
                >
                Edit Tasks
            </Link> */}
            <button type="button" className="btn btn-danger" onClick={this.editTask.bind(this, task.id)} style={{float: 'left'}}>
                Edit Task
            </button>
            <button type="button" className="btn btn-danger" onClick={this.deleteTask.bind(this, task.id)} style={{float: 'right'}}>
                Delete Task
            </button>
          </div>
        </div>
      </div>
    ));
    const noTask = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No tasks yet. Why not <Link to="/new_task">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Current Tasks</h1>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/new_task" className="btn custom-button">
                Create New Task
              </Link>
            </div>
            <div className="row">
              {tasks.length > 0 ? allTasks : noTask}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Tasks;