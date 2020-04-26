import * as React from "react";
import { withRouter } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Collapsible from "react-collapsible";
import invokeAPI from "../../services/InvokeAPI";
import { SAMPLE_OKRS } from "../../services/Endpoints";
import "./HomePage.scss";
import "../../styles/sass/main.scss";

/**
 * @function HomePage
 * @summary Renders the home page component
 */
export function HomePage(props) {
  const [stores, setStores] = useState(null);
  const [search, setSearch] = useState("All");

  // Set the search to the state
  const handleChangeSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  useEffect(() => {
    if (!stores) {
      invokeAPI({
        endpoint: SAMPLE_OKRS,
      }).then((response: any) => {
        setStores(response.data);
      });
    }
  });

  return (
    <React.Fragment>
      <header className="cus-header">
        <h4>Ally.io - React.js</h4>
      </header>
      <div className="container">
        <div className="example m-t-20">
          <strong>Category Filter</strong>
          <select
            className="select-st"
            name="quantity"
            id="quantity"
            value={search}
            onChange={handleChangeSearch}
          >
            <option value="All">All</option>
            <option value="Company">Company</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="People">People</option>
            <option value="Product Management">Product Management</option>
            <option value="Engineering">Engineering</option>
            <option value="Administration">Administration</option>
            <option value="Customer Success">Customer Success</option>
            <option value="Design">Design</option>
          </select>
        </div>
        {stores &&
          stores.map((data, index) => {
            if (search == "All") {
              if (data.parent_objective_id == "") {
                return (
                  <Collapsible trigger={data.title} key={index}>
                    {stores.map((data_child, index2) => {
                      if (data.id == data_child.parent_objective_id) {
                        return <p key={index2}>{data_child.title}</p>;
                      }
                    })}
                  </Collapsible>
                );
              }
            } else {
              if (data.parent_objective_id == "" && data.category == search) {
                return (
                  <Collapsible trigger={data.title} key={index}>
                    {stores.map((data_child, index2) => {
                      if (
                        data.id == data_child.parent_objective_id &&
                        data.category == search
                      ) {
                        return <p key={index2}>{data_child.title}</p>;
                      }
                    })}
                  </Collapsible>
                );
              }
            }
          })}
      </div>
    </React.Fragment>
  );
}

export default withRouter(HomePage);
