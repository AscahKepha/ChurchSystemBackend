import {Router} from "express";
import {createOffering, deleteOffering, getOffering, getOfferingById, updateOffering} from "./offerings.controller";
const router = Router();


//Get all offerings
router.get('/', getOffering);

//get offering by Id
router.get('/:id',getOfferingById);

//create offering
router.post('/',createOffering);

//update offering 
router.put('/:id',updateOffering);

//delete offering
router.delete('/:id',deleteOffering);

