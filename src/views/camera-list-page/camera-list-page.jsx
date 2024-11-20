import React, { useEffect, useState } from "react";
import {
  fetchCameras,
  updateCameraStatus,
} from "../../api/camera-list-services";
import {
  brand_logo,
  check_circle_outline,
  cloud,
  deactivate,
  edge,
  feed,
  location,
  search,
  warning,
} from "../../assets";
import { Dropdown, Input, Table } from "../../components";
import "./camera-list-page.css";
import { locationOptions } from "./locationOptions";

const CameraListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cameraData, setCameraData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const columns = [
    {
      Header: "Name",
      dataKey: "name",
      render: (value, record) => (
        <div className="name-container">
          {record.current_status === "Online" ? (
            <div className="status-online"></div>
          ) : (
            <div className="status-offline"></div>
          )}
          <p>{value}</p>
          {record?.hasWarning && <img src={warning} alt="warning" />}
        </div>
      ),
    },
    {
      Header: "Health",
      dataKey: "health",
      render: (health) => (
        <div className="health-indicators">
          <div className="health-icon-wrapper">
            <img src={cloud} alt="Cloud" className="health-cloud-icon" />
            <div className={`health-cloud`}>
              <p>{health.cloud}</p>
            </div>
          </div>

          <div className="health-icon-wrapper">
            <div className="health-device-icon">
              <img src={edge} alt="Device" />
            </div>
            <div className={`health-device`}>
              <p>{health.device}</p>
            </div>
          </div>
        </div>
      ),
    },
    { Header: "Location", dataKey: "location" },
    {
      Header: "Recorder",
      dataKey: "recorder",
      render: (value) => <p>{value ? value : "N/A"}</p>,
    },
    {
      Header: "Tasks",
      dataKey: "tasks",
      render: (value) => <p>{!!value ? `${value} Tasks` : "N/A"}</p>,
    },
    {
      Header: "Status",
      dataKey: "status",
      render: (value) => (
        <p
          style={{
            width: "fit-content",
            padding: "4px 8px",
            color: value === "Active" ? "#029262" : "#7E7E7E",
            background: value === "Active" ? "#0292621A" : "none",
          }}
        >
          {value}
        </p>
      ),
    },
    {
      Header: "Actions",
      dataKey: "status",
      render: (value, record) => (
        <div className="camera-list-actions">
          {value === "Inactive" ? (
            <img
              src={check_circle_outline}
              alt="inactive"
              onClick={() => handleUpdateStatus(record.id, "Active")}
            />
          ) : (
            <img
              src={deactivate}
              alt="active"
              onClick={() => handleUpdateStatus(record.id, "Inactive")}
            />
          )}
        </div>
      ),
    },
  ];

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateCameraStatus(id, status);
      getCamera();
    } catch (err) {
      setError(err.message);
      alert(`Failed to update camera status: ${err.message}`);
    }
  };

  const getCamera = async () => {
    setLoading(true);
    try {
      const data = await fetchCameras();
      setCameraData(data?.data);
      setFilteredData(data?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInput = (e) => setSearchValue(e.target.value);

  const handleLocationSelect = (value) => setLocationValue(value);

  const handleStatusSelect = (value) => setStatusValue(value);

  useEffect(() => {
    let filtered = cameraData;

    if (locationValue) {
      filtered = filtered.filter(
        (camera) => camera.location === locationValue
      );
    }

    if (statusValue) {
      filtered = filtered.filter((camera) => camera.status === statusValue);
    }

    if (searchValue) {
      filtered = filtered.filter((camera) =>
        camera.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [locationValue, statusValue, searchValue, cameraData]);

  useEffect(() => {
    getCamera();
  }, []);

  console.log(error,loading)

  return (
    <div className="camera_list_container">
      <div className="logo_container">
        <img src={brand_logo} alt="brand-logo" />
      </div>
      <div className="camera_header">
        <div className="camera_list_heading_container">
          <h3 className="camera_list_heading">Cameras</h3>
          <p className="camera_list_description">Manage your cameras here</p>
        </div>
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInput}
          icon={<img src={search} alt="search" />}
        />
      </div>
      <div className="camera-filter">
        <Dropdown
          options={locationOptions}
          label="Location"
          icon={<img src={location} alt="location" />}
          onSelect={handleLocationSelect}
          value={locationValue}
        />
        <Dropdown
          options={["Active", "Inactive"]}
          label="Status"
          icon={<img src={feed} alt="feed" />}
          onSelect={handleStatusSelect}
          value={statusValue}
        />
      </div>
      <Table
        data={filteredData}
        columns={columns}
        rowsPerPage={10}
      />
    </div>
  );
};

export default CameraListPage;
