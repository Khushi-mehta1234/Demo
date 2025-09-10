import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
  const initialProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      image: "./images/1.jpg",
      code: "IP15PRO",
      description: "The latest iPhone with advanced features",
      price: 129999,
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      image: "./images/1.jpg",
      code: "SGS23",
      escription: "The latest iPhone with advanced features",
      price: 99999,
    },
    {
      id: 3,
      name: "OnePlus 11",
      image: "./images/1.jpg",
      code: "OP11",
      escription: "The latest iPhone with advanced features",
      price: 69999,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    code: "",
    price: "",
    image: "",
    description: "",
  });

  // Add Product Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    code: "",
    price: "",
    image: "",
    description: "",
  });

  const handleView = (p) => setViewProduct(p);

  const handleEdit = (p) => {
    setEditProduct(p);
    setEditForm({
      name: p.name,
      code: p.code,
      price: p.price,
      image: p.image,
      description: p.description,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === editProduct.id
          ? {
              ...prod,
              name: editForm.name,
              code: editForm.code,
              price: Number(editForm.price),
              image: editForm.image,
              description: editForm.description,
            }
          : prod
      )
    );
    setEditProduct(null);
  };

  const handleDelete = (p) => alert(`Deleting: ${p.name}`);

  // Add Product Handlers
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: addForm.name,
      code: addForm.code,
      price: Number(addForm.price),
      image: addForm.image,
      description: addForm.description,
    };
    setProducts([...products, newProduct]);
    setAddModalOpen(false);
    setAddForm({
      name: "",
      code: "",
      price: "",
      image: "",
      description: "",
    });
  };

  // Edit Modal
  if (editProduct) {
    return (
      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,0.4)",
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-bold">Edit Product</h4>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditProduct(null)}
              ></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Product Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={editForm.code}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={editForm.image}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <img
                    src={editForm.image}
                    alt="preview"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditProduct(null)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // View Page
  if (viewProduct) {
    return (
      <div className="container mt-4">
        <h3 className="mb-4">Product Details</h3>
        <div className="card p-4" style={{ maxWidth: 400 }}>
          <img
            src={viewProduct.image}
            alt={viewProduct.name}
            className="rounded mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h5>{viewProduct.name}</h5>
          <p>
            <strong>Product Code:</strong> {viewProduct.code}
            <br />
            <strong>Description:</strong> {viewProduct.description}
            <br />
            <strong className="text-primary">Price:</strong> ₹{viewProduct.price}
          </p>
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setViewProduct(null)}
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  // Add Product Modal
  if (addModalOpen) {
    return (
      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,0.4)",
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-bold">Add Product</h4>
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddModalOpen(false)}
              ></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Product Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={addForm.name}
                    onChange={handleAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={addForm.code}
                    onChange={handleAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={addForm.price}
                    onChange={handleAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={addForm.description}
                    onChange={handleAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={addForm.image}
                    onChange={handleAddChange}
                  />
                </div>
                <div>
                  {addForm.image && (
                    <img
                      src={addForm.image}
                      alt="preview"
                      style={{ width: 80, height: 80, objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAddModalOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // List Page
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Product List</h3>
      <button
        className="btn btn-success mb-3"
        onClick={() => setAddModalOpen(true)}
      >
        + Add Product
      </button>
      <div className="list-group">
        {products.map((p) => (
          <div
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {/* Left side: image + name */}
            <div className="d-flex align-items-center">
              <img
                src={p.image}
                alt={p.name}
                className="rounded me-3"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <h6 className="mb-0">{p.name}</h6>
            </div>

            {/* Right side: buttons */}
            <div>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => handleView(p)}
              >
                View
              </button>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(p)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
