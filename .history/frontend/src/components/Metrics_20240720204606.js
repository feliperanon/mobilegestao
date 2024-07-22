import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Navigation from '../components/Navigation';

// Registre os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedEntregadores, setSelectedEntregadores] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const entregadoresRes = await axios.get('http://localhost:5008/api/lists/entregadores');
        setEntregadores(entregadoresRes.data);

        const clientesRes = await axios.get('http://localhost:5008/api/lists/clientes');
        setClientes(clientesRes.data);

        const statusRes = await axios.get('http://localhost:5008/api/lists/status');
        setStatusList(statusRes.data);
      } catch (err) {
        console.error('Erro ao buscar filtros', err);
      }
    };

    fetchFilters();
  }, []);

  const fetchMetrics = async () => {
    try {
      const params = {
        startDate,
        endDate,
        entregadores: selectedEntregadores.join(','),
        clientes: selectedClientes.join(','),
        status: selectedStatus.join(','),
     
