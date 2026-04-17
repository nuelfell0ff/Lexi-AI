import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import '../../styles/Analytics.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const Analytics = ({ applicants = [] }) => {
  const [kpis, setKpis] = useState({
    conversionRate: 0,
    avgResponseTime: '0h',
    activeCampaigns: 0,
    engagementScore: 0
  })

  // Calculate KPIs from applicants data
  useEffect(() => {
    if (applicants && applicants.length > 0) {
      const approved = applicants.filter(a => a.status && a.status.toLowerCase() === 'approved').length
      const rejected = applicants.filter(a => a.status && a.status.toLowerCase() === 'rejected').length
      const conversionRate = ((approved / applicants.length) * 100).toFixed(1)

      // Calculate average response time based on application dates
      let totalResponseTime = 0
      let count = 0
      applicants.forEach(app => {
        if (app.createdAt) {
          const date = app.createdAt?.toDate?.() || new Date(app.createdAt)
          const now = new Date()
          const diffMs = now - date
          const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(1)
          totalResponseTime += parseFloat(diffHours)
          count++
        }
      })
      const avgResponseTime = count > 0 ? (totalResponseTime / count).toFixed(1) : 0

      // Calculate engagement score based on actual actions taken
      const processed = approved + rejected
      const engagementScore = processed > 0 ? Math.round((approved / processed) * 100) : 0

      // Active campaigns = number of approved candidates (ambassadors)
      const activeCampaigns = approved

      setKpis({
        conversionRate,
        avgResponseTime: `${avgResponseTime}h`,
        activeCampaigns,
        engagementScore
      })
    }
  }, [applicants])
  // Generate weekly data
  const getWeeklyData = () => {
    const weeks = [[], [], [], [], []]
    applicants.forEach(app => {
      const date = app.createdAt?.toDate?.() || new Date(app.createdAt)
      const weekNumber = Math.floor(date.getDate() / 7)
      if (weekNumber < 5) {
        weeks[weekNumber].push(app)
      }
    })

    return weeks.map(week => ({
      applications: week.length,
      approvals: week.filter(a => a.status?.toLowerCase() === 'approved').length
    }))
  }

  const weeklyData = getWeeklyData()
  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Applications',
        data: weeklyData.map(w => w.applications),
        backgroundColor: '#1E844F'
      },
      {
        label: 'Approvals',
        data: weeklyData.map(w => w.approvals),
        backgroundColor: '#194066'
      }
    ]
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  // Generate daily data for the last 7 days
  const getDailyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const data = Array(7).fill(0)

    applicants.forEach(app => {
      const date = app.createdAt?.toDate?.() || new Date(app.createdAt)
      const dayOfWeek = date.getDay()
      if (dayOfWeek >= 0 && dayOfWeek < 7) {
        data[dayOfWeek]++
      }
    })

    return data
  }

  const dailyData = getDailyData()
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: dailyData,
        borderColor: '#1E844F',
        backgroundColor: 'rgba(30, 132, 79, 0.1)',
        borderWidth: 2,
        fill: true
      }
    ]
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Monitor campaign performance and metrics</p>
      </div>

      <div className="analytics-grid">
        {/* KPI Cards */}
        <div className="kpi-card">
          <span className="kpi-label">Conversion Rate</span>
          <span className="kpi-value">{kpis.conversionRate}%</span>
          <small className="kpi-change positive">↑ Based on approvals</small>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Avg. Response Time</span>
          <span className="kpi-value">{kpis.avgResponseTime}</span>
          <small className="kpi-change positive">↓ Real-time average</small>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Active Campaigns</span>
          <span className="kpi-value">{kpis.activeCampaigns}</span>
          <small className="kpi-change positive">Active ambassadors</small>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Engagement Score</span>
          <span className="kpi-value">{kpis.engagementScore}/100</span>
          <small className="kpi-change positive">Overall performance</small>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Applications vs Approvals</h3>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        <div className="chart-card">
          <h3>Daily Active Users</h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  )
}

export default Analytics
