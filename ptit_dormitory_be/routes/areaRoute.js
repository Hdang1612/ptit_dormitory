import express from 'express';
import areaController from '../controller/areaController.js';
const areaRoutes = express.Router();
areaRoutes.get('/getPlaces', areaController.getPlaces);
areaRoutes.get('/getPlaceDetail/:id', areaController.getPlaceDetail);
areaRoutes.post('/createPlaces', areaController.createPlaces);
areaRoutes.put('/updatePlaces/:id', areaController.updatePlaces);

// Test
areaRoutes.get('/area', areaController.getAreas);
areaRoutes.post('/area', areaController.addNewArea);
areaRoutes.put('/area/:id', areaController.updateArea);
areaRoutes.get('/floor', areaController.getFloorsByArea);
areaRoutes.post('/floor', areaController.addNewFloor);
areaRoutes.put('/floor/:id', areaController.updateFloor);
areaRoutes.get('/room/getRoomsByFloor', areaController.getRoomsByFloor);
areaRoutes.get('/room/getRoomsByArea', areaController.getRoomsByArea);
areaRoutes.get('/room', areaController.getAndFindRooms);
areaRoutes.post('/room', areaController.addNewRoom);
areaRoutes.put('/room/:id', areaController.updateRoom);

export default areaRoutes;
