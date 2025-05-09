import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [foundPersons, setFoundPersons] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const [reportsRes, helpRes, foundRes,usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/reports/all'),
        axios.get('http://localhost:5000/api/help-requests/all'),
        axios.get('http://localhost:5000/api/found-persons/all'),
        axios.get('http://localhost:5000/api/auth/all')
      ]);

      setReports(reportsRes.data);
      setHelpRequests(helpRes.data);
      setFoundPersons(foundRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

   // Delete User
  const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    await axios.delete(`http://localhost:5000/api/auth/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter(user => user.id !== id));
    console.log(`User with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Failed to delete user:', error.response?.data || error.message);
  }
};


  const deleteReport = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Get the JWT token
  
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      await axios.delete(`http://localhost:5000/api/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to headers
        },
      });
  
      // Refresh reports after deletion
      setReports(reports.filter(report => report.id !== id));
    } catch (error) {
      console.error('Failed to delete report: ', error.response?.data || error.message);
    }
  };


  const deleteHelp = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this help request?')) return;
  
    try {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      await axios.delete(`http://localhost:5000/api/help-requests/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Refresh help requests
    } catch (err) {
      console.error('Failed to delete help request:', err.response?.data || err.message);
    }
  };
  
  const deleteFound = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this found person report?')) return;
  
    try {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      await axios.delete(`http://localhost:5000/api/found-persons/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      fetchData(); // Refresh found persons
    } catch (err) {
      console.error('Failed to delete found person report:', err.response?.data || err.message);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-panel container">
      <h2 className="text-center mt-4 mb-3">Admin Dashboard</h2>


      
      <section>
      <h4>Registered Users</h4>
      <div className="table-responsive mb-4">
      <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      </div>
      </section>

      {/* Missing Reports */}
      <section>
        <h4>Missing Person Reports</h4>
        <div className="table-responsive mb-4">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>User_ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.userId}</td>
                  <td>{report.personName}</td>
                  <td>{report.contactPhone}</td>
                  <td>{report.status}</td>
                  <td>
                    {report.photo && (
                      <img
                        src={`http://localhost:5000/uploads/${report.photo}`}
                        alt="person"
                        height="60"
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteReport(report.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Help Requests */}
      <section>
        <h4>Emergency Help Requests</h4>
        <div className="table-responsive mb-4">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>User_ID</th>
                <th>Location</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {helpRequests.map((help) => (
                <tr key={help.id}>
                  <td>{help.id}</td>
                  <td>{help.userId}</td>
                  <td>{help.location}</td>
                  <td>{help.message}</td>
                  <td>{help.status}</td>
                  <td>
                    <button onClick={() => deleteHelp(help.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Found Person Reports */}
      <section>
        <h4>Found Person Reports</h4>
        <div className="table-responsive mb-5">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Report_ID</th>
                <th>Place</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foundPersons.map((found) => (
                <tr key={found.id}>
                  <td>{found.id}</td>
                  <td>{found.reportId}</td>
                  <td>{found.place}</td>
                  <td>{found.contactPhone}</td>
                  <td>{found.status}</td>
                  <td>
                    {found.photo && (
                      <img
                        src={`http://localhost:5000/${found.photo}`}
                        alt="found"
                        height="60"
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteFound(found.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
