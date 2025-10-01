'use client'

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VulnerabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState('grype');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Placeholder CVE details - you can replace this with your actual data
  const cveDetails = {
    // Format: 'repoName_severity_tool': [array of CVE objects]
    'oam_oam-controller_critical_snyk': [
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Deserialization of Untrusted Data', installedVersion: '-', fixedVersion: '-' },
  ],

  'nonrtric_critical_snyk': [
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Uncaught Exception', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Time-of-check Time-of-use (TOCTOU) Race Condition', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Time-of-check Time-of-use (TOCTOU) Race Condition', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Uncaught Exception', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Time-of-check Time-of-use (TOCTOU) Race Condition', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Time-of-check Time-of-use (TOCTOU) Race Condition', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Uncaught Exception', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Time-of-check Time-of-use (TOCTOU) Race Condition', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'maven', cve: '-', description: 'Time-of-check Time-of-use (TOCTOU) Race Condition', installedVersion: '-', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'gomodules', cve: '-', description: 'Incorrect Implementation of Authentication Algorithm', installedVersion: '-', fixedVersion: '-' },
  ],
    'nonrtric_plt_sme_critical_grype': [
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.14.0', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.6.0', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.6.0', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.8.0', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'github.com/docker/docker', cve: 'GHSA-v23v-6jw2-98fq', description: '-', installedVersion: 'v20.10.17+incompatible', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'github.com/docker/docker', cve: 'GHSA-v23v-6jw2-98fq', description: '-', installedVersion: 'v20.10.17+incompatible', fixedVersion: '-' },
  ],

  'nonrtric_critical_grype': [
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.0.0-20211117183948-ae814b36b871', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'github.com/docker/docker', cve: 'GHSA-v23v-6jw2-98fq', description: '-', installedVersion: 'v20.10.12+incompatible', fixedVersion: '-' },
  ],

  'aiml-fw_apm_monitoring-server_critical_grype': [
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.0.0-20220525230936-793ad666bf5e', fixedVersion: '-' },
  ],

  'oam_oam-controller_critical_grype': [
    { severity: 'CRITICAL', package: 'spring-web', cve: 'GHSA-4wrc-f8pq-fpqp', description: '-', installedVersion: '4.3.7.RELEASE', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'loader-utils', cve: 'GHSA-76p3-8jx3-jpfq', description: '-', installedVersion: '0.2.16', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'loader-utils', cve: 'GHSA-76p3-8jx3-jpfq', description: '-', installedVersion: '0.2.17', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'minimist', cve: 'GHSA-xvch-5gv4-984h', description: '-', installedVersion: '0.0.10', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'parse-url', cve: 'GHSA-j9fq-vwqv-2fm2', description: '-', installedVersion: '6.0.5', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'global-modules-path', cve: 'GHSA-vvj3-85vf-fgmw', description: '-', installedVersion: '2.3.1', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'cipher-base', cve: 'GHSA-cpq7-6gpm-g9rc', description: '-', installedVersion: '1.0.4', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'pbkdf2', cve: 'GHSA-v62p-rq8g-8h59', description: '-', installedVersion: '3.1.2', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'sha.js', cve: 'GHSA-95m3-7q98-8xr5', description: '-', installedVersion: '2.4.11', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'pbkdf2', cve: 'GHSA-h7cp-r72f-jxh6', description: '-', installedVersion: '3.1.2', fixedVersion: '-' },
    { severity: 'CRITICAL', package: '@babel/traverse', cve: 'GHSA-67hx-6x53-jw92', description: '-', installedVersion: '7.22.1', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'babel-traverse', cve: 'GHSA-67hx-6x53-jw92', description: '-', installedVersion: '6.26.0', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'form-data', cve: 'GHSA-fjxv-7rqg-78g4', description: '-', installedVersion: '2.3.3', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'elliptic', cve: 'GHSA-vjh7-7g9h-fjfh', description: '-', installedVersion: '6.5.4', fixedVersion: '-' },
  ],

  'aiml-fw_aihp_ips_kserve-adapter_critical_grype': [
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.0.0-20211215153901-e495a2d5b3d3', fixedVersion: '-' },
    { severity: 'CRITICAL', package: 'github.com/emicklei/go-restful', cve: 'GHSA-r48q-9g5r-8q2h', description: '-', installedVersion: 'v2.11.0+incompatible', fixedVersion: '-' },
  ],

  'smo_teiv_critical_grype': [
    { severity: 'CRITICAL', package: 'postgresql', cve: 'GHSA-24rp-q3w6-vc56', description: '-', installedVersion: '42.5.4', fixedVersion: '-' },
  ],

  'nonrtric_plt_ranpm_critical_grype': [
    { severity: 'CRITICAL', package: 'golang.org/x/crypto', cve: 'GHSA-v778-237x-gjrc', description: '-', installedVersion: 'v0.13.0', fixedVersion: '-' },
  ],
  "nonrtric_plt_sme_high_grype": [
    {
      "severity": "High",
      "package": "github.com/docker/docker",
      "cve": "GHSA-232p-vwff-86mp",
      "description": "-",
      "installedVersion": "v20.10.17+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/docker",
      "cve": "GHSA-232p-vwff-86mp",
      "description": "-",
      "installedVersion": "v20.10.17+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "helm.sh/helm/v3",
      "cve": "GHSA-r53h-jv2g-vpx6",
      "description": "-",
      "installedVersion": "v3.9.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "helm.sh/helm/v3",
      "cve": "GHSA-r53h-jv2g-vpx6",
      "description": "-",
      "installedVersion": "v3.9.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.14.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.6.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.6.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.8.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.7.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.7.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.9.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/getkin/kin-openapi",
      "cve": "GHSA-wq9g-9vfc-cfq9",
      "description": "-",
      "installedVersion": "v0.106.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/getkin/kin-openapi",
      "cve": "GHSA-wq9g-9vfc-cfq9",
      "description": "-",
      "installedVersion": "v0.106.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/getkin/kin-openapi",
      "cve": "GHSA-wq9g-9vfc-cfq9",
      "description": "-",
      "installedVersion": "v0.116.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/getkin/kin-openapi",
      "cve": "GHSA-wq9g-9vfc-cfq9",
      "description": "-",
      "installedVersion": "v0.117.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/distribution",
      "cve": "GHSA-hqxw-f8mx-cpmw",
      "description": "-",
      "installedVersion": "v2.8.1+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/distribution",
      "cve": "GHSA-hqxw-f8mx-cpmw",
      "description": "-",
      "installedVersion": "v2.8.1+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.0.0-20211104180415-d3ed0bb246c8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.0.0-20211104180415-d3ed0bb246c8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/golang-jwt/jwt",
      "cve": "GHSA-mh63-6h87-95cp",
      "description": "-",
      "installedVersion": "v3.2.2+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/golang-jwt/jwt",
      "cve": "GHSA-mh63-6h87-95cp",
      "description": "-",
      "installedVersion": "v3.2.2+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "helm.sh/helm/v3",
      "cve": "GHSA-557j-xg8c-q2mm",
      "description": "-",
      "installedVersion": "v3.9.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "helm.sh/helm/v3",
      "cve": "GHSA-557j-xg8c-q2mm",
      "description": "-",
      "installedVersion": "v3.9.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "google.golang.org/grpc",
      "cve": "GHSA-m425-mq94-257g",
      "description": "-",
      "installedVersion": "v1.47.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "google.golang.org/grpc",
      "cve": "GHSA-m425-mq94-257g",
      "description": "-",
      "installedVersion": "v1.47.0",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_plt_a1policymanagementservice_high_grype": [
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_high_grype": [
    {
      "severity": "High",
      "package": "github.com/containerd/containerd",
      "cve": "GHSA-crp2-qrr5-8pq7",
      "description": "-",
      "installedVersion": "v1.5.9",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "gopkg.in/yaml.v3",
      "cve": "GHSA-hp87-p4gw-j4gq",
      "description": "-",
      "installedVersion": "v3.0.0-20200313102051-9f266ea9e77c",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "gopkg.in/yaml.v3",
      "cve": "GHSA-hp87-p4gw-j4gq",
      "description": "-",
      "installedVersion": "v3.0.0-20210107192922-496545a6307b",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/docker",
      "cve": "GHSA-232p-vwff-86mp",
      "description": "-",
      "installedVersion": "v20.10.12+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-vvpx-j8f3-3w6h",
      "description": "-",
      "installedVersion": "v0.0.0-20220107192237-5cfca573fb4d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "helm.sh/helm/v3",
      "cve": "GHSA-r53h-jv2g-vpx6",
      "description": "-",
      "installedVersion": "v3.8.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.0.0-20211117183948-ae814b36b871",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask",
      "cve": "GHSA-m2qf-hxjv-5gpq",
      "description": "-",
      "installedVersion": "2.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "GHSA-5xp3-jfq3-5q8x",
      "description": "-",
      "installedVersion": "20.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.0.0-20220107192237-5cfca573fb4d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-69cg-p879-7622",
      "description": "-",
      "installedVersion": "v0.0.0-20220107192237-5cfca573fb4d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/distribution",
      "cve": "GHSA-hqxw-f8mx-cpmw",
      "description": "-",
      "installedVersion": "v2.7.1+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-ppp9-7jff-5vj2",
      "description": "-",
      "installedVersion": "v0.3.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.0.0-20211104180415-d3ed0bb246c8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-8c26-wmh5-6g9v",
      "description": "-",
      "installedVersion": "v0.0.0-20211117183948-ae814b36b871",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/dgrijalva/jwt-go",
      "cve": "GHSA-w73w-5m7g-f7qc",
      "description": "-",
      "installedVersion": "v3.2.0+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-69ch-w2m2-3vjp",
      "description": "-",
      "installedVersion": "v0.3.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-69ch-w2m2-3vjp",
      "description": "-",
      "installedVersion": "v0.3.7",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/golang-jwt/jwt/v4",
      "cve": "GHSA-mh63-6h87-95cp",
      "description": "-",
      "installedVersion": "v4.1.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-gwc9-m7rh-j2ww",
      "description": "-",
      "installedVersion": "v0.0.0-20211117183948-ae814b36b871",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "helm.sh/helm/v3",
      "cve": "GHSA-557j-xg8c-q2mm",
      "description": "-",
      "installedVersion": "v3.8.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "google.golang.org/grpc",
      "cve": "GHSA-m425-mq94-257g",
      "description": "-",
      "installedVersion": "v1.43.0",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_rapp_ransliceassurance_high_grype": [
    {
      "severity": "High",
      "package": "gopkg.in/yaml.v3",
      "cve": "GHSA-hp87-p4gw-j4gq",
      "description": "-",
      "installedVersion": "v3.0.0-20200313102051-9f266ea9e77c",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-ppp9-7jff-5vj2",
      "description": "-",
      "installedVersion": "v0.3.6",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-69ch-w2m2-3vjp",
      "description": "-",
      "installedVersion": "v0.3.6",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_plt_dmaapmediatorproducer_high_grype": [
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-vvpx-j8f3-3w6h",
      "description": "-",
      "installedVersion": "v0.3.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.3.0",
      "fixedVersion": "nan"
    }
  ],
  "aiml-fw_apm_monitoring-server_high_grype": [
    {
      "severity": "High",
      "package": "gopkg.in/yaml.v3",
      "cve": "GHSA-hp87-p4gw-j4gq",
      "description": "-",
      "installedVersion": "v3.0.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-vvpx-j8f3-3w6h",
      "description": "-",
      "installedVersion": "v0.0.0-20220531201128-c960675eff93",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.0.0-20220525230936-793ad666bf5e",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.0.0-20220531201128-c960675eff93",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-69cg-p879-7622",
      "description": "-",
      "installedVersion": "v0.0.0-20220531201128-c960675eff93",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-fxg5-wq6x-vr4w",
      "description": "-",
      "installedVersion": "v0.0.0-20220531201128-c960675eff93",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-69ch-w2m2-3vjp",
      "description": "-",
      "installedVersion": "v0.3.7",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_plt_dmaapadapter_high_grype": [
    {
      "severity": "High",
      "package": "protobuf-java",
      "cve": "GHSA-735f-pc8j-v9w8",
      "description": "-",
      "installedVersion": "4.0.0-rc-2",
      "fixedVersion": "nan"
    }
  ],
  "ric-plt_conflictmgr_high_grype": [
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.10.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "google.golang.org/grpc",
      "cve": "GHSA-m425-mq94-257g",
      "description": "-",
      "installedVersion": "v1.52.0",
      "fixedVersion": "nan"
    }
  ],
  "oam_oam-controller_high_grype": [
    {
      "severity": "High",
      "package": "spring-web",
      "cve": "GHSA-ccgv-vj62-xf9h",
      "description": "-",
      "installedVersion": "4.3.7.RELEASE",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "json5",
      "cve": "GHSA-9c47-m6qq-7p4h",
      "description": "-",
      "installedVersion": "0.5.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "spring-web",
      "cve": "GHSA-hgjh-9rj2-g67j",
      "description": "-",
      "installedVersion": "4.3.7.RELEASE",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "spring-web",
      "cve": "GHSA-2wrp-6fg6-hmc5",
      "description": "-",
      "installedVersion": "4.3.7.RELEASE",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ip",
      "cve": "GHSA-2p57-rm9w-gvfp",
      "description": "-",
      "installedVersion": "1.1.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ip",
      "cve": "GHSA-2p57-rm9w-gvfp",
      "description": "-",
      "installedVersion": "1.1.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "terser",
      "cve": "GHSA-4wf5-vphf-c2xc",
      "description": "-",
      "installedVersion": "3.17.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ssri",
      "cve": "GHSA-vx3p-948g-6vhq",
      "description": "-",
      "installedVersion": "5.3.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "serialize-javascript",
      "cve": "GHSA-hxcc-f52p-wc94",
      "description": "-",
      "installedVersion": "1.9.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "lodash.set",
      "cve": "GHSA-p6mc-m468-83gw",
      "description": "-",
      "installedVersion": "4.3.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "trim-newlines",
      "cve": "GHSA-7p7h-4mm5-852v",
      "description": "-",
      "installedVersion": "1.0.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "trim-newlines",
      "cve": "GHSA-7p7h-4mm5-852v",
      "description": "-",
      "installedVersion": "2.0.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "lodash.template",
      "cve": "GHSA-35jh-r3h4-6jhm",
      "description": "-",
      "installedVersion": "4.5.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "json",
      "cve": "GHSA-3vqj-43w4-2q58",
      "description": "-",
      "installedVersion": "20170516",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "json",
      "cve": "GHSA-3vqj-43w4-2q58",
      "description": "-",
      "installedVersion": "20201115",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ws",
      "cve": "GHSA-3h5v-q93c-6h6q",
      "description": "-",
      "installedVersion": "5.2.3",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "json",
      "cve": "GHSA-4jq9-2xhw-jpx7",
      "description": "-",
      "installedVersion": "20170516",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "json",
      "cve": "GHSA-4jq9-2xhw-jpx7",
      "description": "-",
      "installedVersion": "20201115",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "merge",
      "cve": "GHSA-7wpw-2hjm-89gp",
      "description": "-",
      "installedVersion": "1.2.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "body-parser",
      "cve": "GHSA-qwcr-r2fm-qrc7",
      "description": "-",
      "installedVersion": "1.20.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jackson-databind",
      "cve": "GHSA-57j2-w4cx-62h2",
      "description": "-",
      "installedVersion": "2.11.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "marked",
      "cve": "GHSA-rrrm-qjm4-v8hf",
      "description": "-",
      "installedVersion": "0.6.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "marked",
      "cve": "GHSA-5v2h-r2cx-5xgj",
      "description": "-",
      "installedVersion": "0.6.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "semver",
      "cve": "GHSA-c2qf-rxjj-qqgw",
      "description": "-",
      "installedVersion": "5.7.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "semver",
      "cve": "GHSA-c2qf-rxjj-qqgw",
      "description": "-",
      "installedVersion": "6.3.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "semver",
      "cve": "GHSA-c2qf-rxjj-qqgw",
      "description": "-",
      "installedVersion": "7.5.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "browserify-sign",
      "cve": "GHSA-x9w5-v3q2-3rhw",
      "description": "-",
      "installedVersion": "4.2.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "requirejs",
      "cve": "GHSA-x3m3-4wpv-5vgc",
      "description": "-",
      "installedVersion": "2.3.6",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jackson-databind",
      "cve": "GHSA-jjjh-jjxp-wpff",
      "description": "-",
      "installedVersion": "2.11.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "braces",
      "cve": "GHSA-grv7-fg5c-xmjg",
      "description": "-",
      "installedVersion": "1.8.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "braces",
      "cve": "GHSA-grv7-fg5c-xmjg",
      "description": "-",
      "installedVersion": "2.3.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "braces",
      "cve": "GHSA-grv7-fg5c-xmjg",
      "description": "-",
      "installedVersion": "3.0.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "webpack-dev-middleware",
      "cve": "GHSA-wr3j-pwj9-hqq6",
      "description": "-",
      "installedVersion": "3.4.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansi-html",
      "cve": "GHSA-whgm-jr23-g3j9",
      "description": "-",
      "installedVersion": "0.0.7",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jackson-databind",
      "cve": "GHSA-rgv9-q543-rqg4",
      "description": "-",
      "installedVersion": "2.11.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "path-to-regexp",
      "cve": "GHSA-9wv6-86v2-598j",
      "description": "-",
      "installedVersion": "0.1.7",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "path-to-regexp",
      "cve": "GHSA-9wv6-86v2-598j",
      "description": "-",
      "installedVersion": "1.8.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "http-cache-semantics",
      "cve": "GHSA-rc47-6667-2j5j",
      "description": "-",
      "installedVersion": "3.8.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "chart.js",
      "cve": "GHSA-h68q-55jf-x68w",
      "description": "-",
      "installedVersion": "2.8.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "http-proxy-middleware",
      "cve": "GHSA-c7qv-q95q-8v27",
      "description": "-",
      "installedVersion": "0.18.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jackson-databind",
      "cve": "GHSA-3x8x-79m2-3w2w",
      "description": "-",
      "installedVersion": "2.11.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cross-spawn",
      "cve": "GHSA-3xgq-45jj-v275",
      "description": "-",
      "installedVersion": "6.0.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cross-spawn",
      "cve": "GHSA-3xgq-45jj-v275",
      "description": "-",
      "installedVersion": "7.0.3",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "parse-path",
      "cve": "GHSA-3j8f-xvm3-ffx4",
      "description": "-",
      "installedVersion": "4.0.4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "node-forge",
      "cve": "GHSA-x4jg-mjrx-434g",
      "description": "-",
      "installedVersion": "0.10.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "html-minifier",
      "cve": "GHSA-pfq8-rq6v-vf5m",
      "description": "-",
      "installedVersion": "3.5.21",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "node-forge",
      "cve": "GHSA-cfm4-qjh2-4765",
      "description": "-",
      "installedVersion": "0.10.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "path-to-regexp",
      "cve": "GHSA-rhx6-c78j-4q9w",
      "description": "-",
      "installedVersion": "0.1.7",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jsonwebtoken",
      "cve": "GHSA-8cf7-32gw-wr33",
      "description": "-",
      "installedVersion": "8.3.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jetty-server",
      "cve": "GHSA-q4rv-gq96-w7c5",
      "description": "-",
      "installedVersion": "9.4.54.v20240208",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "jackson-core",
      "cve": "GHSA-h46c-h94j-95f3",
      "description": "-",
      "installedVersion": "2.11.0",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_rapp_healthcheck_high_grype": [
    {
      "severity": "High",
      "package": "pygments",
      "cve": "GHSA-pq64-v7f5-gqh8",
      "description": "-",
      "installedVersion": "2.3.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask",
      "cve": "GHSA-m2qf-hxjv-5gpq",
      "description": "-",
      "installedVersion": "2.1.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "pygments",
      "cve": "GHSA-9w8r-397f-prfh",
      "description": "-",
      "installedVersion": "2.3.1",
      "fixedVersion": "nan"
    }
  ],
  "aiml-fw_aihp_ips_kserve-adapter_high_grype": [
    {
      "severity": "High",
      "package": "github.com/prometheus/client_golang",
      "cve": "GHSA-cg3q-j54f-5p7p",
      "description": "-",
      "installedVersion": "v1.7.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/distribution",
      "cve": "GHSA-h62f-wm92-2cmw",
      "description": "-",
      "installedVersion": "v0.0.0-20191216044856-a8371794149d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-vvpx-j8f3-3w6h",
      "description": "-",
      "installedVersion": "v0.4.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/moby/moby",
      "cve": "GHSA-gh5c-3h97-2f3q",
      "description": "-",
      "installedVersion": "v17.12.0-ce-rc1.0.20200618181300-9dc6525e6118+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.0.0-20211215153901-e495a2d5b3d3",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/gogo/protobuf",
      "cve": "GHSA-c3h9-896r-86jm",
      "description": "-",
      "installedVersion": "v1.3.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/moby/moby",
      "cve": "GHSA-2mj3-vfvx-fc43",
      "description": "-",
      "installedVersion": "v17.12.0-ce-rc1.0.20200618181300-9dc6525e6118+incompatible",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.4.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "github.com/docker/distribution",
      "cve": "GHSA-hqxw-f8mx-cpmw",
      "description": "-",
      "installedVersion": "v0.0.0-20191216044856-a8371794149d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.0.0-20210323180902-22b0adad7558",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-8c26-wmh5-6g9v",
      "description": "-",
      "installedVersion": "v0.0.0-20211215153901-e495a2d5b3d3",
      "fixedVersion": "nan"
    }
  ],
  "smo_teiv_high_grype": [
    {
      "severity": "High",
      "package": "httpclient5",
      "cve": "GHSA-73m2-qfq3-56cx",
      "description": "-",
      "installedVersion": "5.4.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    }
  ],
  "it_test_high_grype": [
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-x4qr-2fvf-3mr5",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-x4qr-2fvf-3mr5",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-x4qr-2fvf-3mr5",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-x4qr-2fvf-3mr5",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-3ww4-gg4f-jr7f",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-3ww4-gg4f-jr7f",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-3ww4-gg4f-jr7f",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "cryptography",
      "cve": "GHSA-3ww4-gg4f-jr7f",
      "description": "-",
      "installedVersion": "3.4.8",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible",
      "cve": "GHSA-cpx3-93w7-457x",
      "description": "-",
      "installedVersion": "4.10.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible",
      "cve": "GHSA-cpx3-93w7-457x",
      "description": "-",
      "installedVersion": "5.7.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible",
      "cve": "GHSA-cpx3-93w7-457x",
      "description": "-",
      "installedVersion": "5.7.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible",
      "cve": "GHSA-cpx3-93w7-457x",
      "description": "-",
      "installedVersion": "5.7.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible-core",
      "cve": "GHSA-jpxc-vmjf-9fcj",
      "description": "-",
      "installedVersion": "2.11.11",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible-core",
      "cve": "GHSA-jpxc-vmjf-9fcj",
      "description": "-",
      "installedVersion": "2.12.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible-core",
      "cve": "GHSA-jpxc-vmjf-9fcj",
      "description": "-",
      "installedVersion": "2.12.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "ansible-core",
      "cve": "GHSA-jpxc-vmjf-9fcj",
      "description": "-",
      "installedVersion": "2.12.5",
      "fixedVersion": "nan"
    }
  ],
  "ric-plt_ric-dep_high_grype": [
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.10.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.5.0",
      "fixedVersion": "nan"
    }
  ],
  "aiml-fw_athp_data-extraction_high_grype": [
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-xg9f-g7g7-2323",
      "description": "-",
      "installedVersion": "2.2.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask",
      "cve": "GHSA-m2qf-hxjv-5gpq",
      "description": "-",
      "installedVersion": "2.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask",
      "cve": "GHSA-m2qf-hxjv-5gpq",
      "description": "-",
      "installedVersion": "2.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-2g68-c3qc-8985",
      "description": "-",
      "installedVersion": "2.2.2",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_plt_informationcoordinatorservice_high_grype": [
    {
      "severity": "High",
      "package": "json",
      "cve": "GHSA-4jq9-2xhw-jpx7",
      "description": "-",
      "installedVersion": "20230227",
      "fixedVersion": "nan"
    }
  ],
  "oam_high_grype": [
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-vvpx-j8f3-3w6h",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-69cg-p879-7622",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.0.0-20200107190931-bf48bf16ab8d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-83g2-8m93-v3w7",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_rapp_orufhrecovery_high_grype": [
    {
      "severity": "High",
      "package": "gopkg.in/yaml.v3",
      "cve": "GHSA-hp87-p4gw-j4gq",
      "description": "-",
      "installedVersion": "v3.0.0-20200313102051-9f266ea9e77c",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "urllib3",
      "cve": "GHSA-q2q7-5pp4-w6pg",
      "description": "-",
      "installedVersion": "1.26.4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "urllib3",
      "cve": "GHSA-q2q7-5pp4-w6pg",
      "description": "-",
      "installedVersion": "1.26.4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "urllib3",
      "cve": "GHSA-v845-jxx5-vc9f",
      "description": "-",
      "installedVersion": "1.26.4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "urllib3",
      "cve": "GHSA-v845-jxx5-vc9f",
      "description": "-",
      "installedVersion": "1.26.4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-xg9f-g7g7-2323",
      "description": "-",
      "installedVersion": "1.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask",
      "cve": "GHSA-m2qf-hxjv-5gpq",
      "description": "-",
      "installedVersion": "1.1.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-2g68-c3qc-8985",
      "description": "-",
      "installedVersion": "1.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "certifi",
      "cve": "GHSA-xqr8-7jwr-rhp7",
      "description": "-",
      "installedVersion": "2020.12.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "certifi",
      "cve": "GHSA-xqr8-7jwr-rhp7",
      "description": "-",
      "installedVersion": "2020.12.5",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-ppp9-7jff-5vj2",
      "description": "-",
      "installedVersion": "v0.3.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/text",
      "cve": "GHSA-69ch-w2m2-3vjp",
      "description": "-",
      "installedVersion": "v0.3.2",
      "fixedVersion": "nan"
    }
  ],
  "aiml-fw_athp_tps_kubeflow-adapter_high_grype": [
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-xg9f-g7g7-2323",
      "description": "-",
      "installedVersion": "1.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask",
      "cve": "GHSA-m2qf-hxjv-5gpq",
      "description": "-",
      "installedVersion": "1.1.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-2g68-c3qc-8985",
      "description": "-",
      "installedVersion": "1.0.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "flask-cors",
      "cve": "GHSA-hxwh-jpp2-84pm",
      "description": "-",
      "installedVersion": "4.0.1",
      "fixedVersion": "nan"
    }
  ],
  "smo_o2_high_grype": [
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    }
  ],
  "sim_a1-interface_high_grype": [
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_plt_ranpm_high_grype": [
    {
      "severity": "High",
      "package": "gopkg.in/yaml.v3",
      "cve": "GHSA-hp87-p4gw-j4gq",
      "description": "-",
      "installedVersion": "v3.0.0-20210107192922-496545a6307b",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-vvpx-j8f3-3w6h",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/crypto",
      "cve": "GHSA-hcg3-q754-cr77",
      "description": "-",
      "installedVersion": "v0.13.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-4374-p667-p6c8",
      "description": "-",
      "installedVersion": "v0.15.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-69cg-p879-7622",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.0.0-20200107190931-bf48bf16ab8d",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/oauth2",
      "cve": "GHSA-6v2p-p543-phr9",
      "description": "-",
      "installedVersion": "v0.12.0",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "golang.org/x/net",
      "cve": "GHSA-83g2-8m93-v3w7",
      "description": "-",
      "installedVersion": "v0.0.0-20210405180319-a5a99cb37ef4",
      "fixedVersion": "nan"
    }
  ],
  "aiml-fw_awmf_tm_high_grype": [
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-xg9f-g7g7-2323",
      "description": "-",
      "installedVersion": "2.2.2",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "werkzeug",
      "cve": "GHSA-2g68-c3qc-8985",
      "description": "-",
      "installedVersion": "2.2.2",
      "fixedVersion": "nan"
    }
  ],
  "nonrtric_plt_rappmanager_high_grype": [
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    },
    {
      "severity": "High",
      "package": "pillow",
      "cve": "GHSA-xg8h-j46f-w952",
      "description": "-",
      "installedVersion": "11.2.1",
      "fixedVersion": "nan"
    }
  ],
  "oam_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "aiml-fw_awmf_tm_high_snyk": [
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "pip",
      "cve": "-",
      "description": "Remote Code Execution (RCE)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "smo_teiv_high_snyk": [
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Server-side Request Forgery (SSRF)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Relative Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Relative Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_plt_rappmanager_high_snyk": [
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "HTTP Request Smuggling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "oam_oam-controller_high_snyk": [
    {
      "severity": "High",
      "package": "yarn",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "yarn",
      "cve": "-",
      "description": "Improper Handling of Extra Parameters",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "SQL Injection",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Server-side Request Forgery (SSRF)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Implementation of Authentication Algorithm",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Integer Overflow or Wraparound",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Resource Shutdown or Release",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Insufficient Session Expiration",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Equivalence",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Cleanup on Thrown Exception",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Open Redirect",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Relative Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Server-side Request Forgery (SSRF)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Implementation of Authentication Algorithm",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Integer Overflow or Wraparound",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Resource Shutdown or Release",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Equivalence",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Cleanup on Thrown Exception",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Relative Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Server-side Request Forgery (SSRF)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Deserialization of Untrusted Data",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Implementation of Authentication Algorithm",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Integer Overflow or Wraparound",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Resource Shutdown or Release",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Equivalence",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Cleanup on Thrown Exception",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Relative Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Directory Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Access Restriction Bypass",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Arbitrary Code Injection",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_plt_a1policymanagementservice_high_snyk": [
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "HTTP Request Smuggling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Integer Overflow or Wraparound",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Resource Shutdown or Release",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Relative Path Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_plt_sme_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Directory Traversal",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Arbitrary Code Injection",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Use of Uninitialized Resource",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_plt_ranpm_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_plt_informationcoordinatorservice_high_snyk": [
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "HTTP Request Smuggling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Improper Handling of Highly Compressed Data (Data Amplification)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Uncontrolled Recursion",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "maven",
      "cve": "-",
      "description": "Incorrect Authorization",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "aiml-fw_apm_monitoring-server_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Improper Input Validation",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Improper Input Validation",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_rapp_orufhrecovery_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "NULL Pointer Dereference",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "ric-plt_ric-dep_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "aiml-fw_aihp_ips_kserve-adapter_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Authorization Bypass",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Authorization Bypass",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Authorization Bypass",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Improper Input Validation",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Allocation of Resources Without Limits or Throttling",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_plt_dmaapmediatorproducer_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  "nonrtric_rapp_ransliceassurance_high_snyk": [
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    },
    {
      "severity": "High",
      "package": "gomodules",
      "cve": "-",
      "description": "Denial of Service (DoS)",
      "installedVersion": "-",
      "fixedVersion": "-"
    }
  ],
  
  };


  const computeMostCommonCVEs = (cveDetails) => {
    console.log("cveDetails", cveDetails);
  
    const cveMap = {}; // key: CVE/description, value: { severity, package, description, count, affectedRepos }
  
    Object.entries(cveDetails).forEach(([repoName, severitiesArray]) => {
      console.log("repoName:", repoName, "severitiesArray:", severitiesArray);
  
      if (Array.isArray(severitiesArray)) {
        severitiesArray.forEach((cve) => {
          console.log("cve object:", cve);
  
          if (cve.severity.toLowerCase() === "high") {
            const key = cve.cve || cve.description || "-";
            if (!cveMap[key]) {
              cveMap[key] = {
                severity: cve.severity,
                package: cve.package || "-",
                description: cve.description || "-",
                occurrences: 1,
                affectedRepos: [repoName],
              };
            } else {
              cveMap[key].occurrences += 1;
              if (!cveMap[key].affectedRepos.includes(repoName)) {
                cveMap[key].affectedRepos.push(repoName);
              }
            }
          }
        });
      }
    });
  
    console.log("cveMap", cveMap);
  
    // sort by occurrences descending and take top N (e.g., top 10)
    return Object.entries(cveMap)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.occurrences - a.occurrences)
      .slice(0, 10);
  };
  

  const getCVEDetails = (repoName, severity, tool) => {
    const key = `${repoName}_${severity}_${tool}`;
    return cveDetails[key] || [];
  };

  const openModal = (repoName, severity, tool, count) => {
    if (count === 0) return;
    
    const details = getCVEDetails(repoName, severity, tool);
    setModalData({
      repoName,
      severity,
      tool,
      count,
      details
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const mostCommonCVEs = computeMostCommonCVEs(cveDetails);

  // Grype data - sorted by total vulnerabilities
  const gryperData = [
    { repo: 'nonrtric', critical: 2, high: 22, medium: 45, low: 5, total: 74 },
    { repo: 'nonrtric_plt_sme', critical: 6, high: 26, medium: 69, low: 4, total: 105 },
    { repo: 'oam_oam-controller', critical: 14, high: 51, medium: 50, low: 19, total: 134 },
    { repo: 'aiml-fw_aihp_ips_kserve-adapter', critical: 2, high: 11, medium: 18, low: 1, total: 32 },
    { repo: 'nonrtric_plt_ranpm', critical: 1, high: 9, medium: 15, low: 0, total: 25 },
    { repo: 'nonrtric_rapp_orufhrecovery', critical: 0, high: 12, medium: 26, low: 1, total: 39 },
    { repo: 'it_test', critical: 0, high: 16, medium: 48, low: 16, total: 80 },
    { repo: 'oam', critical: 0, high: 5, medium: 15, low: 0, total: 20 },
    { repo: 'aiml-fw_athp_tps_kubeflow-adapter', critical: 0, high: 4, medium: 9, low: 1, total: 14 },
    { repo: 'aiml-fw_athp_data-extraction', critical: 0, high: 4, medium: 3, low: 1, total: 8 },
    { repo: 'aiml-fw_apm_monitoring-server', critical: 1, high: 7, medium: 10, low: 0, total: 18 },
    { repo: 'nonrtric_rapp_ransliceassurance', critical: 0, high: 3, medium: 3, low: 0, total: 6 },
    { repo: 'nonrtric_rapp_healthcheck', critical: 0, high: 3, medium: 4, low: 0, total: 7 },
    { repo: 'ric-plt_conflictmgr', critical: 0, high: 2, medium: 6, low: 0, total: 8 },
    { repo: 'aiml-fw_awmf_tm', critical: 0, high: 2, medium: 3, low: 1, total: 6 },
    { repo: 'nonrtric_plt_dmaapmediatorproducer', critical: 0, high: 2, medium: 7, low: 0, total: 9 },
    { repo: 'ric-plt_ric-dep', critical: 0, high: 2, medium: 6, low: 0, total: 8 },
    { repo: 'smo_teiv', critical: 1, high: 2, medium: 1, low: 0, total: 4 },
    { repo: 'nonrtric_plt_rappmanager', critical: 0, high: 2, medium: 0, low: 0, total: 2 },
    { repo: 'nonrtric_plt_a1policymanagementservice', critical: 0, high: 1, medium: 0, low: 0, total: 1 },
    { repo: 'nonrtric_plt_dmaapadapter', critical: 0, high: 1, medium: 2, low: 1, total: 4 },
    { repo: 'nonrtric_plt_informationcoordinatorservice', critical: 0, high: 1, medium: 0, low: 0, total: 1 },
    { repo: 'smo_o2', critical: 0, high: 1, medium: 0, low: 0, total: 1 },
    { repo: 'sim_a1-interface', critical: 0, high: 1, medium: 0, low: 0, total: 1 },
    { repo: 'it_tifg', critical: 0, high: 0, medium: 2, low: 0, total: 2 },
    { repo: 'it_dep', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ci-management', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_aimlfw-dep', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ric-app_ad-cell', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_awmf_modelmgmtservice', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_apm_monitoring-agent', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'o-du_l2', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_athp_sdk_model-storage', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'pti_rtp', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric_plt_rappcatalogue', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_apm_analysis-module', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'sim_ns3-o-ran-e2', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric_plt_helmmanager', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'pti_o2', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_athp_sdk_feature-store', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'doc', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric_plt_informationcoordinatorservice', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: '.github', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'portal_aiml-dashboard', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_athp_pipeline-components', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ric-plt_xapp-frame-rust', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'o-du_phy', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'sim_o1-ofhmp-interfaces', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw_aihp_tps_kserve-adapter', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'portal_nonrtric-controlpanel', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
  ].sort((a, b) => b.total - a.total);

  // Snyk data - sorted by total vulnerabilities
  const snykData = [
    { repo: 'nonrtric', critical: 10, high: 439, medium: 126, low: 18, total: 593 },
    { repo: 'nonrtric/plt/sme', critical: 0, high: 245, medium: 48, low: 4, total: 297 },
    { repo: 'aiml-fw/aihp/ips/kserve-adapter', critical: 0, high: 165, medium: 21, low: 0, total: 186 },
    { repo: 'ric-plt/ric-dep', critical: 0, high: 132, medium: 0, low: 0, total: 132 },
    { repo: 'oam/oam-controller', critical: 1, high: 7, medium: 94, low: 3, total: 105 },
    { repo: 'aiml-fw/awmf/tm', critical: 0, high: 18, medium: 48, low: 9, total: 75 },
    { repo: 'aiml-fw/apm/monitoring-server', critical: 0, high: 26, medium: 10, low: 0, total: 36 },
    { repo: 'nonrtric/plt/rappmanager', critical: 0, high: 14, medium: 2, low: 4, total: 20 },
    { repo: 'smo/teiv', critical: 0, high: 8, medium: 0, low: 3, total: 11 },
    { repo: 'nonrtric/plt/a1policymanagementservice', critical: 0, high: 9, medium: 0, low: 1, total: 10 },
    { repo: 'pti/o2', critical: 0, high: 0, medium: 8, low: 0, total: 8 },
    { repo: 'nonrtric/rapp/ransliceassurance', critical: 0, high: 2, medium: 4, low: 0, total: 6 },
    { repo: 'nonrtric/plt/informationcoordinatorservice', critical: 0, high: 6, medium: 0, low: 0, total: 6 },
    { repo: 'nonrtric/rapp/orufhrecovery', critical: 0, high: 3, medium: 2, low: 0, total: 5 },
    { repo: 'nonrtric/plt/ranpm', critical: 0, high: 3, medium: 0, low: 0, total: 3 },
    { repo: 'oam', critical: 0, high: 1, medium: 1, low: 0, total: 2 },
    { repo: 'nonrtric/plt/dmaapmediatorproducer', critical: 0, high: 1, medium: 1, low: 0, total: 2 },
    { repo: 'it/dep', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ci-management', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/aimlfw-dep', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ric-app/ad-cell', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/awmf/modelmgmtservice', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'it/test', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'pti/rtp', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'portal/aiml-dashboard', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/athp/pipeline-components', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'o-du/l2', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/athp/sdk/model-storage', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/apm/monitoring-agent', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/apm/analysis-module', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/apm/influx-wrapper', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ric-plt/conflictmgr', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'sim/o1-ofhmp-interfaces', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'o-du/phy', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: '.github', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric/plt/dmaapadapter', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric/plt/rappcatalogue', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'ric-plt/xapp-frame-rust', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'sim/ns3-o-ran-e2', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/aihp/tps/kserve-adapter', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'sim/a1-interface', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/athp/data-extraction', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/athp/sdk/feature-store', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'doc', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'it/tifg', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'aiml-fw/athp/tps/kubeflow-adapter', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'smo/o2', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric/plt/helmmanager', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'nonrtric/rapp/healthcheck', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
    { repo: 'portal/nonrtric-controlpanel', critical: 0, high: 0, medium: 0, low: 0, total: 0 },
  ].sort((a, b) => b.total - a.total);

  // Critical CVEs comparison
  const criticalCVEs = [
    { repo: 'nonrtric', snyk: 10, grype: 2 },
    { repo: 'nonrtric_plt_sme', snyk: 0, grype: 6 },
    { repo: 'oam_oam-controller', snyk: 1, grype: 14 },
    { repo: 'aiml-fw_aihp_ips_kserve-adapter', snyk: 0, grype: 2 },
    { repo: 'aiml-fw_apm_monitoring-server', snyk: 0, grype: 1 },
    { repo: 'nonrtric_plt_ranpm', snyk: 0, grype: 1 },
    { repo: 'smo_teiv', snyk: 0, grype: 1 },
  ].sort((a, b) => (b.snyk + b.grype) - (a.snyk + a.grype));

  // High CVEs comparison
  const highCVEs = [
    { repo: 'nonrtric', snyk: 439, grype: 22 },
    { repo: 'nonrtric_plt_sme', snyk: 245, grype: 26 },
    { repo: 'aiml-fw_aihp_ips_kserve-adapter', snyk: 165, grype: 11 },
    { repo: 'ric-plt_ric-dep', snyk: 132, grype: 2 },
    { repo: 'oam_oam-controller', snyk: 7, grype: 51 },
    { repo: 'aiml-fw_apm_monitoring-server', snyk: 26, grype: 7 },
    { repo: 'aiml-fw_awmf_tm', snyk: 18, grype: 2 },
    { repo: 'it_test', snyk: 0, grype: 16 },
    { repo: 'nonrtric_plt_rappmanager', snyk: 14, grype: 2 },
    { repo: 'nonrtric_rapp_orufhrecovery', snyk: 3, grype: 12 },
    { repo: 'aiml-fw_aihp_ips_kserve-adapter', snyk: 0, grype: 11 },
    { repo: 'nonrtric_plt_a1policymanagementservice', snyk: 9, grype: 1 },
    { repo: 'nonrtric_plt_ranpm', snyk: 3, grype: 9 },
    { repo: 'smo_teiv', snyk: 8, grype: 2 },
    { repo: 'nonrtric_plt_informationcoordinatorservice', snyk: 6, grype: 1 },
    { repo: 'oam', snyk: 1, grype: 5 },
    { repo: 'aiml-fw_athp_tps_kubeflow-adapter', snyk: 0, grype: 4 },
    { repo: 'aiml-fw_athp_data-extraction', snyk: 0, grype: 4 },
    { repo: 'nonrtric_rapp_ransliceassurance', snyk: 2, grype: 3 },
    { repo: 'nonrtric_rapp_healthcheck', snyk: 0, grype: 3 },
    { repo: 'ric-plt_conflictmgr', snyk: 0, grype: 2 },
    { repo: 'nonrtric_plt_dmaapmediatorproducer', snyk: 1, grype: 2 },
  ].sort((a, b) => (b.snyk + b.grype) - (a.snyk + a.grype));

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'critical': return 'bg-purple-100 text-purple-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const VulnCell = ({ count, severity }) => {
    if (count === 0) return <td className="px-4 py-2 text-center text-gray-400">0</td>;
    return (
      <td className="px-4 py-2 text-center">
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getSeverityColor(severity)}`}>
          {count}
        </span>
      </td>
    );
  };

  const ComparisonCell = ({ count, severity, repoName, tool }) => {
    if (count === 0) return <td className="px-4 py-2 text-center text-gray-400">0</td>;
    return (
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => openModal(repoName, severity, tool, count)}
          className={`px-2 py-1 rounded-full text-sm font-semibold ${getSeverityColor(severity)} hover:opacity-80 cursor-pointer transition-opacity`}
        >
          {count}
        </button>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">O-RAN-SC Vulnerability Scan Report</h1>
      <p className="text-gray-600 mb-1">
        Consolidated results from Snyk and Grype scans - September 30, 2025
      </p>
      <p className="text-gray-700 font-medium">
        Total Repositories Scanned: 50 | Active in last 12 months: 50
      </p>
      <h3 className='text-xl mt-3 mb-3'>This dashboard contains:</h3>
      <p className='mt-2'>
1. Table with sepearate tabs for scan results: Grype Results and Snyk Results, each showing a table of repositories with counts of critical, high, medium, low, and total vulnerabilities.<br/>
2. Critical CVEs Comparison table across repositories (Snyk vs Grype).<br/>
3. High Severity CVEs Comparison table across repositories (Snyk vs Grype).<br/>
4. Most Common High Severity CVEs table, showing CVE ID, package, description, severity, occurrences, and affected repositories.<br/>
5. bar charts:<br/>
&nbsp;&nbsp;a. Total CVEs per repository (stacked by severity)<br/>
&nbsp;&nbsp;b. Critical CVEs comparison (Snyk vs Grype)<br/>
&nbsp;&nbsp;c. High Severity CVEs comparison (Snyk vs Grype)
</p>

    </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {modalData?.severity.toUpperCase()} Severity CVEs
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  Repository: {modalData?.repoName} | Tool: {modalData?.tool.toUpperCase()} | Total: {modalData?.count}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-300 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              {modalData?.details.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Package</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">CVE/GHSA</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Installed Version</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fixed Version</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {modalData.details.map((cve, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">{cve.package}</td>
                        <td className="px-4 py-3 text-sm font-mono text-blue-600">{cve.cve}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{cve.description}</td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-700">{cve.installedVersion}</td>
                        <td className="px-4 py-3 text-sm font-mono text-green-700">{cve.fixedVersion || 'N/A'}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(cve.severity)}`}>
                            {cve.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No CVE details available.</p>
                  <p className="text-gray-400 text-sm mt-2">Add data to the cveDetails object for this repository and severity.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* Scan Results Tables */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex space-x-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('grype')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'grype'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grype Results
            </button>
            <button
              onClick={() => setActiveTab('snyk')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'snyk'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Snyk Results
            </button>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'grype' && (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Repository</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Critical</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">High</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Medium</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Low</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gryperData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.repo}</td>
                      <VulnCell count={row.critical} severity="critical" />
                      <VulnCell count={row.high} severity="high" />
                      <VulnCell count={row.medium} severity="medium" />
                      <VulnCell count={row.low} severity="low" />
                      <td className="px-4 py-3 text-center font-semibold">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'snyk' && (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Repository</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Critical</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">High</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Medium</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Low</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {snykData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.repo}</td>
                      <VulnCell count={row.critical} severity="critical" />
                      <VulnCell count={row.high} severity="high" />
                      <VulnCell count={row.medium} severity="medium" />
                      <VulnCell count={row.low} severity="low" />
                      <td className="px-4 py-3 text-center font-semibold">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Critical CVEs Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Critical CVEs Comparison</h2>
          <p className="text-gray-500 mb-4">Click on a repository's count to open the modal and see detailed high severity CVEs.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Repository</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Snyk</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Grype</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {criticalCVEs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.repo}</td>
                    <ComparisonCell count={row.snyk} severity="critical" repoName={row.repo} tool="snyk" />
                    <ComparisonCell count={row.grype} severity="critical" repoName={row.repo} tool="grype" />
                    <td className="px-4 py-3 text-center">
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-200 text-purple-900">
                        {row.snyk + row.grype}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High CVEs Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">High Severity CVEs Comparison</h2>
        <p className="text-gray-500 mb-4">Click on a repository's count to open the modal and see detailed high severity CVEs.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Repository</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Snyk</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Grype</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {highCVEs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.repo}</td>
                    <ComparisonCell count={row.snyk} severity="high" repoName={row.repo} tool="snyk" />
                    <ComparisonCell count={row.grype} severity="high" repoName={row.repo} tool="grype" />
                    <td className="px-4 py-3 text-center">
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-200 text-red-900">
                        {row.snyk + row.grype}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        

<div className="bg-white rounded-lg shadow-lg p-6 mt-8">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Most Common High Severity CVEs</h2>
  <p className="text-gray-500 mb-4">
    Top high severity CVEs across all scanned repositories. Click a row to see affected repositories.
  </p>
  <div className="overflow-x-auto">
  <table className="w-full">
  <thead>
    <tr className="bg-gray-100">
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">CVE / GHSA</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Package</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Severity</th>
      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Occurrences</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Affected Repositories</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {mostCommonCVEs.map((cve, idx) => (
      <tr key={idx} className="hover:bg-gray-50 cursor-pointer">
        <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
        <td className="px-4 py-3 text-sm font-mono text-blue-600">{cve.id}</td>
        <td className="px-4 py-3 text-sm font-mono text-gray-900">{cve.package || "-"}</td>
        <td className="px-4 py-3 text-sm text-gray-900">{cve.description || "-"}</td>
        <td className="px-4 py-3 text-center">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(cve.severity)}`}>
            {cve.severity}
          </span>
        </td>
        <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">{cve.occurrences}</td>
        <td className="px-4 py-3 text-sm text-gray-700">
          <ol className="list-decimal list-inside">
            {cve.affectedRepos.map((repo, i) => (
              <li key={i}>{repo}</li>
            ))}
          </ol>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
</div>

<div className="space-y-10">
      {/* Total CVEs per repository - Grype vs Snyk */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Total CVEs per Repository</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={snykData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="repo" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="critical" fill="#f87171" />
            <Bar dataKey="high" fill="#facc15" />
            <Bar dataKey="medium" fill="#3b82f6" />
            <Bar dataKey="low" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Critical CVEs Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Critical CVEs Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={criticalCVEs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="repo" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="snyk" fill="#f87171" name="Snyk Critical" />
            <Bar dataKey="grype" fill="#3b82f6" name="Grype Critical" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* High CVEs Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">High Severity CVEs Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={highCVEs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="repo" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="snyk" fill="#facc15" name="Snyk High" />
            <Bar dataKey="grype" fill="#3b82f6" name="Grype High" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
      </div>
    </div>
  );
};

export default VulnerabilityDashboard;