import {Component, OnInit} from 'angular2/core';

import { SensorService, Sensor } from '../core/sensor';
import { SensorFilterComponent } from './sensor-filter.component';
import { SensorListComponent } from './sensor-list.component';
import { FilterSensor } from './filter-sensor.pipe';
import { ConfigModalComponent } from './config-modal.component';

@Component({
    selector: 'configure',
    moduleId: module.id,
    directives: [ SensorFilterComponent, SensorListComponent, ConfigModalComponent ],
    pipes: [FilterSensor],
    templateUrl: 'sensor-config.html'
})

export class SensorConfigureComponent implements OnInit {
    private filter: string;
    private sensors: Sensor[] = [];

    constructor(public sensorService: SensorService) {    
    }
    
    refreshSensors(filterData) {
        this.sensorService.discoverSensors()
            .subscribe(data => {
                this.sensors = new FilterSensor().transform(data, [filterData]);
            });
    }
    
    addToDashboard(sensor: Sensor) {
        console.log('logging sensor', sensor);
    }

}