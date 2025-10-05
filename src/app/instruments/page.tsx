'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

interface Instrument {
  id: string;
  [key: string]: unknown;
}

export default function Instruments() {
  const [instruments, setInstruments] = useState<Instrument[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstruments() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );
      
      const { data } = await supabase.from('instruments').select();
      setInstruments(data);
      setLoading(false);
    }

    fetchInstruments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}