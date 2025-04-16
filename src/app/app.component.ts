import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
interface TripDetailsConfigModel {
  currentStartTripInput: string;
  currentEndTripInput: string;
  isFirstTrip: boolean;
  prevStartTrip: string;
  prevEndTrip: string;
  tripCounter: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tripDetailsConfig!: TripDetailsConfigModel;
  addedTrips: any;
  constructor() { }

  ngOnInit(): void {
    this.loadConfig();
  }
  //<path d="M10 90 C 30 90, 70 10, 90 10" stroke="#f5b041" fill="transparent" stroke-width="2"></path

  addNewTrip() {
    if (!this.addedTrips) {
      this.addedTrips = [];
    }
    const currentInputKey = this.tripDetailsConfig.currentStartTripInput.trim().toLowerCase() + '#' + this.tripDetailsConfig.currentEndTripInput.trim().toLowerCase();
    this.addedTrips.push(currentInputKey);
    const currentAddedTripsLength = this.addedTrips.length;
    // first trip
    if (this.addedTrips.length === 1) {
      this.createFirstTrip(currentInputKey);
    } else if (this.addedTrips[currentAddedTripsLength - 2] === this.addedTrips[currentAddedTripsLength - 1]) {
      this.secondLevelTrip(currentInputKey, currentAddedTripsLength);
    } else if (this.tripDetailsConfig.prevEndTrip === this.tripDetailsConfig.currentStartTripInput) {
      this.firstLevelTripWithSameDestinationSource(currentInputKey);
    } else if (this.tripDetailsConfig.prevEndTrip !== this.tripDetailsConfig.currentStartTripInput) {
      this.firstLevelTripWithDifferentDestinationSouce(currentInputKey);
    }
    this.tripDetailsConfig.tripCounter++;
  }

  createFirstTrip(currentInputKey: string) {
    const getBodyId = document.getElementById('showPathId');
    if (getBodyId) {
      const firstTripCircleNode = document.createElement('span');
      firstTripCircleNode.id = `${currentInputKey}#${this.tripDetailsConfig.tripCounter}`;
      firstTripCircleNode.classList.add('circle-css');
      const tripNameNode = document.createElement('span');
      tripNameNode.innerText = this.abbrevatedString();
      tripNameNode.classList.add('circle-namesis');
      firstTripCircleNode.appendChild(tripNameNode);
      getBodyId.appendChild(firstTripCircleNode);
    }
    this.tripDetailsConfig.prevStartTrip = this.tripDetailsConfig.currentStartTripInput;
    this.tripDetailsConfig.prevEndTrip = this.tripDetailsConfig.currentEndTripInput;
  }

  // if prev trip start and end location is same as current trip
  secondLevelTrip(currentInputKey: string, currentAddedTripsLength: number) {
    const getBodyId = document.getElementById('showPathId');
    // find the latest circle; if it's already on level 2 then add the consecutive nodes on level 2 only
    const isLatestElementOnTop = document.getElementById('showPathId')?.lastElementChild?.classList?.value?.includes('shift-to-level-2');
    if (getBodyId) {
      const lineWithCircleNode = document.createElement('span');
      lineWithCircleNode.classList.add('line-with-circle');
      lineWithCircleNode.id = `${currentInputKey}#${this.tripDetailsConfig.tripCounter}`;
      // if it's 2 trip having same consecutive source and destination; shift it to seconf level
      if (this.addedTrips.length === 2) {
        const lastNode = document.getElementById('showPathId')?.lastElementChild;
        lastNode?.classList?.add('shift-to-level-2'); // shift first trip node to second level
        lineWithCircleNode.classList.add('shift-to-level-2');
      } else {
        // if it's not already on the top then only addd s curve
        if (!isLatestElementOnTop) {
          lineWithCircleNode.id = `${currentInputKey}#${this.tripDetailsConfig.tripCounter}`;
          const getKey1 = document.getElementById(`${currentInputKey}#${currentAddedTripsLength - 2}`);
          getKey1 ? getBodyId.removeChild(getKey1) : '';
          const getKey2 = document.getElementById(`${currentInputKey}#${currentAddedTripsLength - 2}`);
          getKey2 ? getBodyId.removeChild(getKey2) : '';
          const sCurveNodeUp = document.createElement('span');
          sCurveNodeUp.classList.add('level-chaneg-span-up');
          getBodyId.appendChild(sCurveNodeUp);
          const svgMarkup = `
         <svg width="115" height="100">
             <path d="M10 90 C 30 90, 70 10, 90 10" stroke="#f5b041" fill="transparent" stroke-width="2"></path>
             <circle cx="106" cy="10" r="7" fill="white" stroke="green" stroke-width="2"></circle>
         </svg>
         `;
          sCurveNodeUp.innerHTML = svgMarkup;
          lineWithCircleNode.classList.add('shift-to-level-2');
          const sCurveNodeName = document.createElement('span');
          sCurveNodeName.innerText = this.abbrevatedString();
          sCurveNodeName.classList.add('level-up-namesis');
          lineWithCircleNode.appendChild(sCurveNodeName);
        }
      }
      if (isLatestElementOnTop) {
        lineWithCircleNode.classList.add('shift-to-level-2'); // shift new node to level 2 if the prev node is also on level 2
      }
      const tripNameNode = document.createElement('span');
      tripNameNode.innerText = this.abbrevatedString();
      tripNameNode.classList.add('without-arrow-namesis');
      lineWithCircleNode.appendChild(tripNameNode);
      getBodyId.appendChild(lineWithCircleNode);

    }
    this.tripDetailsConfig.prevStartTrip = this.tripDetailsConfig.currentStartTripInput;
    this.tripDetailsConfig.prevEndTrip = this.tripDetailsConfig.currentEndTripInput;
  }

  // first/ second level trip with same prev destination and current source
  firstLevelTripWithSameDestinationSource(currentInputKey: string) {
    const getBodyId = document.getElementById('showPathId');
    const isLatestElementOnTop = document.getElementById('showPathId')?.lastElementChild?.classList?.value?.includes('shift-to-level-2');

    if (getBodyId) {
      if (isLatestElementOnTop) {
        // if the previous node is on top
        const sCurveNodeDown = document.createElement('span');
        sCurveNodeDown.classList.add('level-chaneg-span-down');
        getBodyId?.appendChild(sCurveNodeDown);
        const svgMarkup = `
          <svg width="120" height="103">
             <path d="M10 10 C 30 10, 70 90, 90 90" stroke="#f5b041" fill="transparent" stroke-width="2" />
             <circle cx="109" cy="94" r="7" fill="white" stroke="green" stroke-width="2"></circle>
          </svg>
          `;
        sCurveNodeDown.innerHTML = svgMarkup;
        const sCurveNodeName = document.createElement('span');
        sCurveNodeName.innerText = this.abbrevatedString();
        sCurveNodeName.classList.add('level-down-namesis');
        sCurveNodeDown.appendChild(sCurveNodeName);
      } else {
        const lineWithCircleNode = document.createElement('span');
        lineWithCircleNode.classList.add('line-with-circle');
        lineWithCircleNode.id = `${currentInputKey}#${this.tripDetailsConfig.tripCounter}`;
        const tripNameNode = document.createElement('span');
        tripNameNode.innerText = this.abbrevatedString();
        tripNameNode.classList.add('without-arrow-namesis');
        lineWithCircleNode.appendChild(tripNameNode);
        getBodyId.appendChild(lineWithCircleNode);
      }
    }

    this.tripDetailsConfig.prevStartTrip = this.tripDetailsConfig.currentStartTripInput;
    this.tripDetailsConfig.prevEndTrip = this.tripDetailsConfig.currentEndTripInput;
  }

  // first level trip with different prev destination and current source
  firstLevelTripWithDifferentDestinationSouce(currentInputKey: string) {
    const getBodyId = document.getElementById('showPathId');
    const isLatestElementOnTop = document.getElementById('showPathId')?.lastElementChild?.classList?.value?.includes('shift-to-level-2');
    if (getBodyId) {
      if (isLatestElementOnTop) {
        // if prev node is already on the top
        const sCurveNodeDown = document.createElement('span');
        sCurveNodeDown.classList.add('level-chaneg-span-down');
        getBodyId?.appendChild(sCurveNodeDown);
        const svgMarkup = `
          <svg width="120" height="103">
             <path d="M10 10 C 30 10, 70 90, 90 90" stroke="#f5b041" fill="transparent" stroke-width="2" />
             <circle cx="109" cy="94" r="7" fill="white" stroke="green" stroke-width="2"></circle>
          </svg>
          `;
        sCurveNodeDown.innerHTML = svgMarkup;
        const sCurveNodeName = document.createElement('span');
        sCurveNodeName.innerText = this.abbrevatedString();
        sCurveNodeName.classList.add('level-down-namesis');
        sCurveNodeDown.appendChild(sCurveNodeName);
      } else {
        const lineWithCircleNode1 = document.createElement('span');
        const lineWithCircleNode2 = document.createElement('span');
        lineWithCircleNode1.classList.add('line-with-arrow');
        lineWithCircleNode2.classList.add('arrow-with-circle');
        lineWithCircleNode1.id = `${currentInputKey}#${this.tripDetailsConfig.tripCounter}`;
        lineWithCircleNode2.id = `${currentInputKey}#${this.tripDetailsConfig.tripCounter}`;
        const tripNameNode = document.createElement('span');
        tripNameNode.innerText = this.abbrevatedString();
        tripNameNode.classList.add('arrow-namesis');
        lineWithCircleNode2.appendChild(tripNameNode);
        getBodyId.appendChild(lineWithCircleNode1);
        getBodyId.appendChild(lineWithCircleNode2);
      }
    }
    this.tripDetailsConfig.prevStartTrip = this.tripDetailsConfig.currentStartTripInput;
    this.tripDetailsConfig.prevEndTrip = this.tripDetailsConfig.currentEndTripInput;
  }

  abbrevatedString(): string {
    return this.tripDetailsConfig.currentStartTripInput.trim().substring(0, 3).toUpperCase() + '-' + this.tripDetailsConfig.currentEndTripInput.trim().substring(0, 3).toUpperCase();
  }

  checkIfDisabled() {
    if (this.tripDetailsConfig) {
      if (!this.tripDetailsConfig.currentStartTripInput) {
        return true;
      }
      if (!this.tripDetailsConfig.currentEndTripInput) {
        return true;
      }
      return false;
    }
    return true;
  }

  loadConfig() {
    this.tripDetailsConfig = {
      currentStartTripInput: '',
      currentEndTripInput: '',
      isFirstTrip: false,
      prevStartTrip: '',
      prevEndTrip: '',
      tripCounter: 0
    };
  }
}

