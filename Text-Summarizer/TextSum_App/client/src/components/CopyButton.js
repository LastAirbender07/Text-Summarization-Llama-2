import React, { useState } from 'react'
import { LuCopy } from 'react-icons/lu';

const CopyButton = ({ scanResult }) => {
    const [copied, setCopied] = useState(false);
      
    const handleCopy = () => {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        }, 1500);
      };
  return (
    <LuCopy onClick={handleCopy}/>
  )
}

export default CopyButton;
