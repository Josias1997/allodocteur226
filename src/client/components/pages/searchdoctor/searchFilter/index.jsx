import React, {Component} from 'react';
import DatePicker from "react-datepicker";
class SearchFilter extends Component{
    state = {
        startDate: new Date()
      };
     
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };  
    render(){
        return(
                 <div className="card search-filter">
                            <div className="card-header">
                                <h4 className="card-title mb-0">Filtre de recherche</h4>
                            </div>
                            <div className="card-body">
                            <div className="filter-widget">
                                <div className="cal-icon">
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    className="form-control datetimepicker"
                                />
                                </div>			
                            </div>
                            <div className="filter-widget">
                                <h4>Gender</h4>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="gender_type" defaultChecked />
                                        <span className="checkmark"></span> Homme
                                    </label>
                                </div>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="gender_type" />
                                        <span className="checkmark"></span> Femme
                                    </label>
                                </div>
                            </div>
                            <div className="filter-widget">
                                <h4>Select Specialist</h4>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="select_specialist" defaultChecked />
                                        <span className="checkmark"></span> Urologiste
                                    </label>
                                </div>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="select_specialist" defaultChecked />
                                        <span className="checkmark"></span> Neurologiste
                                    </label>
                                </div>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="select_specialist" />
                                        <span className="checkmark"></span> Dentiste
                                    </label>
                                </div>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="select_specialist" />
                                        <span className="checkmark"></span> Orthopediste
                                    </label>
                                </div>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="select_specialist" />
                                        <span className="checkmark"></span> Cardiologiste
                                    </label>
                                </div>
                                <div>
                                    <label className="custom_check">
                                        <input type="checkbox" name="select_specialist" />
                                        <span className="checkmark"></span> Pédiatre
                                    </label>
                                </div>
                            </div>
                                <div className="btn-search">
                                    <button type="button" className="btn btn-block">Rechercher</button>
                                </div>	
                            </div>
                        </div>
        );
    }
}

export default SearchFilter;