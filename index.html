import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function EmployeeProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [employee, setEmployee] = useState(null);
  const [filtered, setFiltered] = useState([]);

  // OQ brand colors
  const orange = "#FA8200";
  const blue = "#0A1E3C";
  const teal = "#00AFB9";

  // Load CSV data
  useEffect(() => {
    async function loadData() {
      try {
        const file = await window.fs.readFile('Employee profile 2025.csv');
        const text = new TextDecoder('cp1252').decode(file);
        
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Filter employees based on search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered([]);
      return;
    }
    
    const term = search.toLowerCase();
    const results = data
      .filter(emp => {
        const name = emp['Employee(s)'] ? String(emp['Employee(s)']).toLowerCase() : '';
        const id = emp['Personnel no.'] ? String(emp['Personnel no.']) : '';
        return name.includes(term) || id.includes(term);
      })
      .slice(0, 5);
    
    setFiltered(results);
  }, [search, data]);

  // Select an employee
  function selectEmployee(emp) {
    setEmployee(emp);
    setSearch(emp['Employee(s)']);
    setFiltered([]);
  }

  // Analyze performance trend
  function getPerformanceTrend() {
    if (!employee) return { trend: 'Unknown', consistent: false };
    
    const ratings = {
      'Exceptional': 5,
      'Exceed Target': 4,
      'Achieved Target': 3,
      'Need Improvement': 2,
      'Low Performance': 1
    };
    
    const perf = [];
    if (employee['2021 perfromance '] && ratings[employee['2021 perfromance ']]) {
      perf.push(ratings[employee['2021 perfromance ']]);
    }
    if (employee['2022 perfromance '] && ratings[employee['2022 perfromance ']]) {
      perf.push(ratings[employee['2022 perfromance ']]);
    }
    if (employee['2023 perfromance '] && ratings[employee['2023 perfromance ']]) {
      perf.push(ratings[employee['2023 perfromance ']]);
    }
    
    if (perf.length < 2) return { trend: 'Insufficient Data', consistent: false };
    
    let trend = 'Stable';
    const last = perf.length - 1;
    
    if (perf[last] > perf[last-1]) {
      trend = 'Improving';
    } else if (perf[last] < perf[last-1]) {
      trend = 'Declining';
    }
    
    const consistent = perf.length < 3 || 
      (trend === 'Improving' && perf[1] >= perf[0] && perf[2] >= perf[1]) ||
      (trend === 'Declining' && perf[1] <= perf[0] && perf[2] <= perf[1]) ||
      (trend === 'Stable' && perf[0] === perf[1] && perf[1] === perf[2]);
    
    return { trend, consistent };
  }

  // Get potential status based on 9-box
  function getPotential() {
    if (!employee || !employee['9 box matrix']) return { status: 'Not Assessed', color: 'gray' };
    
    const nineBox = employee['9 box matrix'];
    const highPotential = ['Hi-Potential', 'Hi-Lead', 'Hi-Professional', 'High-Grow'];
    const lowPotential = ['Safe Hand', 'Dilemma', 'Casting Error', 'Shortfall'];
    
    if (highPotential.includes(nineBox)) {
      return { status: 'Potential', color: teal };
    } else if (nineBox === 'Promising') {
      return { status: 'Promising', color: orange };
    } else if (lowPotential.includes(nineBox)) {
      return { status: 'Not Potential', color: '#ef4444' };
    } else {
      return { status: 'Not Assessed', color: 'gray' };
    }
  }

  // Get color for 9-box ranking
  function get9BoxColor() {
    if (!employee || !employee['9 box matrix']) return 'gray';
    
    const nineBox = employee['9 box matrix'];
    const highPotential = ['Hi-Potential', 'Hi-Lead', 'Hi-Professional', 'High-Grow'];
    const lowPotential = ['Safe Hand', 'Dilemma', 'Casting Error', 'Shortfall'];
    
    if (highPotential.includes(nineBox)) {
      return teal;
    } else if (nineBox === 'Promising') {
      return orange;
    } else if (lowPotential.includes(nineBox)) {
      return '#ef4444';
    } else {
      return 'gray';
    }
  }

  // Get color for skill level
  function getSkillColor() {
    if (!employee || !employee['skill level']) return 'gray';
    
    const skill = employee['skill level'];
    
    if (skill === 'Expert' || skill === 'Advanced') {
      return teal;
    } else if (skill === 'Intermediate') {
      return orange;
    } else if (skill === 'Basic' || skill === 'Beginner') {
      return '#ef4444';
    } else {
      return 'gray';
    }
  }

  // Get recommendations
  function getRecommendations() {
    if (!employee) return [];
    
    const recs = [];
    const skill = employee['skill level'];
    const nineBox = employee['9 box matrix'];
    
    // Add skill-based recommendations
    if (skill === 'Expert') {
      recs.push('Lead knowledge transfer initiatives');
      recs.push('Represent organization in industry forums');
      recs.push('Mentor high-potential employees');
    } else if (skill === 'Advanced') {
      recs.push('Deepen specialized expertise');
      recs.push('Take on mentoring responsibilities');
      recs.push('Lead technical projects');
    } else if (skill === 'Intermediate') {
      recs.push('Pursue advanced certifications');
      recs.push('Take on increasingly complex assignments');
      recs.push('Begin developing mentoring capabilities');
    } else if (skill === 'Basic' || skill === 'Beginner') {
      recs.push('Intensive technical skills development');
      recs.push('Structured learning path with regular checkpoints');
      recs.push('Regular coaching sessions');
    }
    
    // Add 9-box based recommendation
    const highPotential = ['Hi-Potential', 'Hi-Lead', 'Hi-Professional', 'High-Grow'];
    if (highPotential.includes(nineBox)) {
      recs.push('Leadership development program');
    } else if (nineBox === 'Promising') {
      recs.push('Project leadership experience');
    } else if (nineBox === 'Safe Hand' || nineBox === 'Dilemma' || 
               nineBox === 'Casting Error' || nineBox === 'Shortfall') {
      recs.push('Performance improvement plan');
    }
    
    return recs.slice(0, 4);
  }

  if (loading) {
    return <div className="p-4 text-center">Loading employee data...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: blue, padding: '16px', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <div style={{ color: orange, fontWeight: 'bold', fontSize: '24px', marginRight: '16px' }}>OQ</div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Employee Profile Platform</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        {/* Search Box */}
        <div style={{ marginBottom: '24px', position: 'relative' }}>
          <div style={{ 
            border: `2px solid ${orange}`,
            borderRadius: '4px',
            backgroundColor: 'white',
            padding: '8px'
          }}>
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: 'none',
                outline: 'none'
              }}
            />
          </div>
          
          {filtered.length > 0 && (
            <div style={{ 
              position: 'absolute',
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '4px',
              marginTop: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              maxHeight: '240px',
              overflow: 'auto',
              zIndex: 10,
              border: `1px solid ${orange}`
            }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {filtered.map((emp, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer'
                    }}
                    onClick={() => selectEmployee(emp)}
                  >
                    <span style={{ color: blue, fontWeight: 500 }}>{emp['Employee(s)']}</span>
                    <span style={{ color: 'gray', marginLeft: '8px', fontSize: '14px' }}>
                      #{emp['Personnel no.']}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {employee ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {/* Employee Basic Info */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${orange}`
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: blue, margin: 0 }}>
                  Employee Profile
                </h2>
                <span style={{ 
                  backgroundColor: `${getPotential().color}20`,
                  color: getPotential().color,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '14px'
                }}>
                  {getPotential().status}
                </span>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: blue, margin: '0 0 4px 0' }}>
                  {employee['Employee(s)']}
                </h3>
                <p style={{ color: 'gray', margin: 0 }}>{employee['Positions']}</p>
              </div>
              
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: 'gray' }}>Personnel ID:</span>
                  <span style={{ fontWeight: '500', color: blue }}>{employee['Personnel no.']}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: 'gray' }}>Function:</span>
                  <span style={{ fontWeight: '500', color: blue }}>{employee['Function']}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: 'gray' }}>Department:</span>
                  <span style={{ fontWeight: '500', color: blue }}>{employee['Department ']}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: 'gray' }}>Team:</span>
                  <span style={{ fontWeight: '500', color: blue }}>{employee['Team']}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: 'gray' }}>Grade:</span>
                  <span style={{ fontWeight: '500', color: blue }}>{employee['Grade']}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: 'gray' }}>Years of Service:</span>
                  <span style={{ fontWeight: '500', color: blue }}>
                    {employee['Years of experience']} years
                  </span>
                </div>
              </div>
            </div>
            
            {/* Performance Analysis */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${teal}`
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: blue, margin: '0 0 16px 0' }}>
                Performance Analysis
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '16px', 
                marginBottom: '16px' 
              }}>
                <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '14px', color: 'gray', marginBottom: '4px' }}>2021 Performance</div>
                  <div style={{ 
                    fontWeight: '600',
                    color: employee['2021 perfromance '] === 'Exceptional' || employee['2021 perfromance '] === 'Exceed Target' 
                      ? teal 
                      : blue 
                  }}>
                    {employee['2021 perfromance '] || 'Not Rated'}
                  </div>
                </div>
                
                <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '14px', color: 'gray', marginBottom: '4px' }}>2022 Performance</div>
                  <div style={{ 
                    fontWeight: '600',
                    color: employee['2022 perfromance '] === 'Exceptional' || employee['2022 perfromance '] === 'Exceed Target' 
                      ? teal 
                      : blue 
                  }}>
                    {employee['2022 perfromance '] || 'Not Rated'}
                  </div>
                </div>
                
                <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '14px', color: 'gray', marginBottom: '4px' }}>2023 Performance</div>
                  <div style={{ 
                    fontWeight: '600',
                    color: employee['2023 perfromance '] === 'Exceptional' || employee['2023 perfromance '] === 'Exceed Target' 
                      ? teal 
                      : blue 
                  }}>
                    {employee['2023 perfromance '] || 'Not Rated'}
                  </div>
                </div>
              </div>
              
              <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                <div style={{ fontWeight: '500', color: blue }}>
                  Performance Trend: {getPerformanceTrend().trend}
                  {getPerformanceTrend().consistent ? ' (Consistent)' : ' (Variable)'}
                </div>
              </div>
              
              <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                <div style={{ fontWeight: '500', color: blue, marginBottom: '4px' }}>9-Box Ranking:</div>
                <div style={{ color: get9BoxColor() }}>
                  {employee['9 box matrix'] || 'Not Ranked'}
                </div>
              </div>
              
              <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                <div style={{ fontWeight: '500', color: blue, marginBottom: '4px' }}>Skill Level:</div>
                <div style={{ color: getSkillColor() }}>
                  {employee['skill level'] || 'Not Assessed'}
                </div>
              </div>
              
              <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                <div style={{ fontWeight: '500', color: blue, marginBottom: '4px' }}>Succession Status:</div>
                <div style={{ 
                  color: employee['Successor'] && employee['Successor'].toUpperCase() === 'YES' 
                    ? teal 
                    : "gray" 
                }}>
                  {employee['Successor'] && employee['Successor'].toUpperCase() === 'YES' 
                    ? `Identified as successor for position: ${employee['succession position'] || 'Not specified'}` 
                    : 'Not currently in succession plan'}
                </div>
              </div>
            </div>
            
            {/* AI Assessment */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${orange}`
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: blue, margin: '0 0 16px 0' }}>
                AI Assessment & Recommendations
              </h2>
              
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '16px', 
                borderRadius: '4px', 
                marginBottom: '24px',
                border: `1px solid ${getPotential().status === 'Potential' ? `${teal}30` : `${orange}30`}`
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  marginTop: 0,
                  marginBottom: '8px',
                  color: getPotential().status === 'Potential' ? teal : orange
                }}>
                  {getPotential().status === 'Potential' ? 'High Potential' : 
                   getPotential().status === 'Not Potential' ? 'Needs Development' : 
                   getPotential().status === 'Promising' ? 'Growing Talent' : 'Needs Assessment'}
                </h3>
                <p style={{ color: 'gray', margin: 0 }}>
                  {getPotential().status === 'Potential' ? 
                    `Exceptional performer consistently exceeding targets${
                      employee['Successor'] && employee['Successor'].toUpperCase() === 'YES' ? 
                      ' and identified as a successor' : ''
                    }. Recommended for leadership development programs and increased responsibilities.` : 
                   getPotential().status === 'Not Potential' ? 
                    'Requires focused intervention and performance improvement plan. Consider skills assessment and targeted coaching.' : 
                   getPotential().status === 'Promising' ? 
                    'Shows consistent improvement and solid potential. Provide targeted development opportunities.' : 
                    'Insufficient data for accurate assessment. Recommend completing 9-box evaluation.'}
                </p>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: blue, margin: '0 0 8px 0' }}>
                  Technical Skill Assessment:
                </h3>
                <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                  <p style={{ color: 'gray', margin: 0 }}>
                    {employee['skill level'] === 'Expert' 
                      ? 'Employee demonstrates exceptional mastery of technical skills with ability to tackle complex challenges. Can lead initiatives and mentor others.' 
                      : employee['skill level'] === 'Advanced'
                      ? 'Employee shows strong technical proficiency with deep domain knowledge. Capable of handling complex tasks independently.'
                      : employee['skill level'] === 'Intermediate'
                      ? 'Employee has good working knowledge and can complete standard tasks with minimal supervision. Ready for more complex assignments.'
                      : employee['skill level'] === 'Basic' || employee['skill level'] === 'Beginner'
                      ? 'Employee has foundational technical knowledge but requires structured development to build capabilities.'
                      : 'Skill level not assessed.'}
                  </p>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: blue, margin: '0 0 8px 0' }}>
                  Development Recommendations:
                </h3>
                <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {getRecommendations().map((rec, index) => (
                      <li key={index} style={{ 
                        marginBottom: index < getRecommendations().length - 1 ? '8px' : 0,
                        display: 'flex',
                        alignItems: 'flex-start'
                      }}>
                        <span style={{ 
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: orange,
                          marginTop: '6px',
                          marginRight: '8px'
                        }}></span>
                        <span style={{ color: 'gray' }}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: blue, margin: '0 0 8px 0' }}>
                  Key Focus Areas:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                    <h4 style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      margin: '0 0 4px 0', 
                      color: teal 
                    }}>
                      Strengths to Leverage:
                    </h4>
                    <p style={{ color: 'gray', margin: 0, fontSize: '14px' }}>
                      {getPotential().status === 'Potential' 
                        ? 'Leadership capability and consistent high performance' 
                        : getPotential().status === 'Promising'
                          ? 'Improving performance trajectory and technical abilities'
                          : getPotential().status === 'Not Potential'
                            ? 'Core technical competencies and existing knowledge base'
                            : 'Current skills and experiences that can be built upon'}
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                    <h4 style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      margin: '0 0 4px 0', 
                      color: orange 
                    }}>
                      Areas for Development:
                    </h4>
                    <p style={{ color: 'gray', margin: 0, fontSize: '14px' }}>
                      {getPotential().status === 'Potential' 
                        ? 'Strategic thinking and broader organizational impact' 
                        : getPotential().status === 'Promising'
                          ? 'Consistency and specialized technical skills development'
                          : getPotential().status === 'Not Potential'
                            ? 'Performance metrics and core competency enhancement'
                            : 'Comprehensive skills assessment and development planning'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '24px'
              }}>
                <button style={{
                  backgroundColor: blue,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={() => window.print()}>
                  Print Profile
                </button>
                
                <button style={{
                  backgroundColor: orange,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={() => alert('Email functionality will be linked with Outlook 365')}>
                  Send by Email
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '4px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              fontWeight: '600', 
              fontSize: '20px', 
              color: blue,
              marginBottom: '8px'
            }}>
              No Employee Selected
            </div>
            <p style={{ color: 'gray', marginBottom: '24px' }}>
              Search for an employee by name or ID to view their profile
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeProfile;
