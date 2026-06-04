import axios from 'axios';
import type { AnalyseResponse } from '../types/intel';

const BASE = 'http://localhost:8000';

export const analyseTarget = (target: string): Promise<AnalyseResponse> =>
  axios
    .get<AnalyseResponse>(`${BASE}/analyse`, { params: { target } })
    .then((r) => r.data);
