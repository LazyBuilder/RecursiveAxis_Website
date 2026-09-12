'use client';
import React from 'react';
import { Tag } from 'lucide-react';

const TagPill = ({ text }) => (
    <span className="inline-flex items-center rounded-full bg-cyan-600/20 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-cyan-600/50 mr-2 mb-2 transition duration-300 hover:bg-cyan-500/30">
        <Tag className="w-3 h-3 mr-1" />
        {text}
    </span>
);

export default TagPill;
