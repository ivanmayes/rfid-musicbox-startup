import express from "express";
import wifiController from "../controllers/wifi.controller"
const router = express.Router()

router.post('/set', (req, res) => {
    wifiController.set(req, res);
});

router.get('/scan', (req, res) => {
    wifiController.scan(req, res);
});

export default router;