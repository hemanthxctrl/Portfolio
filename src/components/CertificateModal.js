'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function CertificateModal({ isOpen, onClose, certificateData }) {
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificateData) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.75, +(prev - 0.25).toFixed(2)));
  const handleZoomReset = () => setZoom(1);

  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        ref={contentRef}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(0, 98, 255, 0.15)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            background: 'linear-gradient(to right, #ffffff, #f8fafc)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(0, 98, 255, 0.08)',
                  color: 'var(--accent-blue)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={14} /> Verified Credential
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#059669',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <CheckCircle size={14} /> Completed
              </span>
            </div>
            <h3
              id="certificate-modal-title"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {certificateData.title || 'Internship Certificate'}
            </h3>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {certificateData.organization} • Project: <strong style={{ color: 'var(--text-primary)' }}>{certificateData.project}</strong>
            </p>
          </div>

          {/* Action Bar (Zoom, Download, Close) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Zoom Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '8px',
                padding: '0.15rem',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                aria-label="Zoom out"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.4rem',
                  cursor: zoom <= 0.75 ? 'not-allowed' : 'pointer',
                  color: zoom <= 0.75 ? '#94a3b8' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '6px',
                }}
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                aria-label="Reset zoom"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minWidth: '46px',
                  textAlign: 'center',
                  borderRadius: '6px',
                }}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
                aria-label="Zoom in"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.4rem',
                  cursor: zoom >= 2.5 ? 'not-allowed' : 'pointer',
                  color: zoom >= 2.5 ? '#94a3b8' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '6px',
                }}
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Download Certificate Button */}
            <a
              href={certificateData.image}
              download={certificateData.downloadName || 'ANS_Oceanverse_Internship_Certificate.jpg'}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
              }}
            >
              <Download size={15} /> Download
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate preview"
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'background 0.2s',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Canvas Body */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            minHeight: '360px',
          }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src={certificateData.image}
              alt="ANS Oceanverse Technologies Internship Certificate for U. Hemanth Sreenivas - HI-HUBBLE Project"
              width={1200}
              height={810}
              style={{
                width: '100%',
                maxWidth: '960px',
                height: 'auto',
                aspectRatio: '1024 / 692',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                display: 'block',
              }}
              priority
            />
          </div>
        </div>

        {/* Modal Particulars Info Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#ffffff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.85rem',
            fontSize: '0.825rem',
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Intern Name</span>
            <strong style={{ color: 'var(--text-primary)' }}>U. Hemanth Sreenivas</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Designation</span>
            <strong style={{ color: 'var(--accent-blue)' }}>Cloud &amp; Security Engineer Intern</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Project / Employee ID</span>
            <strong style={{ color: 'var(--text-primary)' }}>HI-HUBBLE • ANSID0006</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Duration &amp; Arrangement</span>
            <strong style={{ color: 'var(--text-primary)' }}>15 June 2026 – 30 Sept 2026 (WFH)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
