import { useEffect, useState } from 'react';
import axios from 'axios';
import './All_transaction.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function All_transaction() {
  // modal functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update info
  const [id, setId] = useState(null);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [camt, setCamt] = useState('');
  const [damt, setDamt] = useState(0);
  const [status, setStatus] = useState('');

  const handleid = (e) => getId(e.target.value);
  const handledate = (e) => setDate(e.target.value);
  const handlecategory = (e) => setCategory(e.target.value);
  const handlecamt = (e) => setCamt(e.target.value);
  const handledamt = (e) => setDamt(e.target.value);
  const handlestatus = (e) => setStatus(e.target.value);

  const [creditedTransactions, setCreditedTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // 🔍 search filters
  const [searchCategory, setSearchCategory] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const api = () => {
    axios.get("http://localhost:8080/sorted")
      .then(res => {
        const sortedList = [...res.data.menulist].sort((a, b) => a.id - b.id);
        setTransactions(sortedList);
      })
      .catch(err => {
        console.error("Error fetching transactions", err);
      });
  };

  useEffect(() => {
    api();
  }, []);

  // delete
  const del = (id) => {
    const conf = window.confirm('Are you sure you want to delete this transaction?');
    if (!conf) return;

    axios.delete(`http://localhost:8080/delete/${id}`)
      .then(res => {
        if (res.data.status === "200") {
          alert('Transaction has been deleted successfully');
          api();
          setShow(false);
        } else {
          alert('Something went wrong while deleting!');
        }
      });
  };

  // update
  function getId(id, category, date, camt, damt, status) {
    setId(id);
    setCategory(category);
    setDate(date);
    setCamt(camt);
    setDamt(damt);
    setStatus(status);
    handleShow();
  }

  const updt = () => {
    const dt = {
      id,
      category,
      date,
      camt,
      damt,
      status
    };

    const clearInput = () => {
      setCategory('');
      setDate('');
      setCamt('');
      setDamt('');
      setStatus('');
    };

    axios.put('http://localhost:8080/updt', dt)
      .then(res => {
        if (res.data.status == 200) {
          alert('Menu Updated Successfully');
          api();
          setShow(false);
          clearInput();
        } else {
          alert('Menu Not Updated');
        }
      });
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter(txn =>
    txn.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
    (searchDate === '' || txn.date === searchDate)
  );

  return (
    <div className="tcontainer mt-4">
      <h4 className="mb-3 text-center">All Transactions</h4>

      {/* 🔍 Search Filters */}
      <div className="d-flex justify-content-end gap-3 mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <input
          type="date"
          className="form-control w-25"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      <div className="table-responsive custom-shadow">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Credit Amount(₹)</th>
              <th>Debit Amount(₹)</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn, index) => (
                <tr
                  key={index}
                  className={
                    parseFloat(txn.camt) > 0
                      ? 'credited-row'
                      : parseFloat(txn.damt) > 0
                      ? 'debited-row'
                      : ''
                  }
                >
                  <td>{txn.category}</td>
                  <td>{txn.date}</td>
                  <td>{txn.camt}</td>
                  <td>{txn.damt}</td>
                  <td>
                    <span className={`status-badge ${txn.status.toLowerCase()}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() =>
                        getId(txn.id, txn.category, txn.date, txn.camt, txn.damt, txn.status)
                      }
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => del(txn.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Update Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Tea"
                  value={category}
                  onChange={handlecategory}
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={handledate}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Credit Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 100"
                  value={camt}
                  onChange={handlecamt}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Debit Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 100"
                  value={damt}
                  onChange={handledamt}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={handlestatus}>
                  <option value="" disabled>Select status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updt}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default All_transaction;
