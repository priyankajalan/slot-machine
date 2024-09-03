"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post(`/roll`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // initiate a new roll
}));
app.post(`/cashout`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // initiate a cashout
}));
app.get(`/accounts/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.account.findFirst({
        where: {
            id: req.params.id,
        },
    });
    res.json(result);
}));
app.post(`/accounts`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.account.create({
        data: Object.assign({}, req.body),
    });
    res.status(201).json(result);
}));
exports.default = app;
