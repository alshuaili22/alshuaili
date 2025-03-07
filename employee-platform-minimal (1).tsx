import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Simplified version without complex styling
const EmployeeProfilePlatform = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Brand colors
  const colors = {
    orange: "#FA8200",
    midnightBlue: "#0A1E3C",
    turquoise: "#00AFB9"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fs.readFile('Employee profile 2025.csv');
        const text = new TextDecoder('cp1252').decode(response);
        
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setEmployeeData(results.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = employeeData.filter(emp => {
      const nameMatch = emp['Employee(s)'] && 
                       String(emp['Employee(s)']).toLowerCase().includes(searchLower);
      const idMatch = emp['Personnel no.'] && 
                     String(emp['Personnel no.']).includes(searchTerm);
      
      return nameMatch || idMatch;
    }).slice(0, 5);
    
    setFilteredEmployees(filtered);
  }, [searchTerm, employeeData]);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setSearchTerm(employee['Employee(s)']);
    setFilteredEmployees([]);
  };

  const analyzePerformanceTrend = (employee) => {
    if (!employee) return { trend: 'Unknown', consistent: false, latestRating: 0 };
    
    const perf2021 = employee['2021 perfromance '];
    const perf2022 = employee['2022 perfromance '];
    const perf2023 = employee['2023 perfromance '];
    
    const perfRatings = {
      'Exceptional': 5,
      'Exceed Target': 4,
      'Achieved Target': 3,
      'Need Improvement': 2,
      'Low Performance': 1,
      'Unrated': 0,
      '#N/A': 0
    };
    
    const ratings = [
      perf2021 ? (perfRatings[perf2021] || 0) : null,
      perf2022 ? (perfRatings[perf2022] || 0) : null,
      perf2023 ? (perfRatings[perf2023] || 0) : null
    ].filter(r => r !== null);
    
    let trend = "Stable";
    let direction = 0;
    
    if (ratings.length >= 2) {
      const lastIdx = ratings.length - 1;
      if (ratings[lastIdx] > ratings[lastIdx - 1]) {
        trend = "Improving";
        direction = 1;
      } else if (ratings[lastIdx] < ratings[lastIdx - 1]) {
        trend = "Declining";
        direction = -1;
      }
    }
    
    let consistent = true;
    if (ratings.length >= 3) {
      if (direction === 1) {
        consistent = ratings[1] >= ratings[0] && ratings[2] >= ratings[1];
      } else if (direction === -1) {
        consistent = ratings[1] <= ratings[0] && ratings[2] <= ratings[1];
      } else {
        consistent = ratings[0] === ratings[1] && ratings[1] === ratings[2];
      }
    }
    
    return {
      trend,
      consistent,
      hasData: ratings.length > 0,
      ratings,
      latestRating: ratings.length > 0 ? ratings[ratings.length - 1] : 0
    };
  };

  const getEmployeePotential = (employee) => {
    if (!employee) return { category: 'Unknown', description: 'Insufficient data' };
    
    const nineBox = employee['9 box matrix'];
    const performanceTrend = analyzePerformanceTrend(employee);
    const isSuccessor = employee['Successor'] && employee['Successor'].toUpperCase() === 'YES';
    
    const highPotentialBoxes = ['Hi-Potential', 'Hi-Lead', 'Hi-Professional', 'High-Grow'];
    const mediumPotentialBoxes = ['Promising', 'Safe Hand'];
    const lowPotentialBoxes = ['Dilemma', 'Shortfall', 'Casting Error'];
    
    let category = 'Needs Assessment';
    let description = '';
    
    if (highPotentialBoxes.includes(nineBox) && performanceTrend.latestRating >= 4) {
      category = 'High Potential';
      description = `Exceptional performer consistently exceeding targets${isSuccessor ? ' and identified as a successor' : ''}. Recommended for leadership development programs and increased responsibilities.`;
    } else if (highPotentialBoxes.includes(nineBox) && performanceTrend.latestRating === 3) {
      category = 'Emerging Talent';
      description = 'Demonstrates high potential with solid performance. Focus on challenging assignments to accelerate growth.';
    } else if (mediumPotentialBoxes.includes(nineBox) && performanceTrend.trend === 'Improving') {
      category = 'Growing Talent';
      description = 'Shows consistent improvement and solid potential. Provide targeted development opportunities.';
    } else if (mediumPotentialBoxes.includes(nineBox) && performanceTrend.latestRating >= 3) {
      category = 'Solid Performer';
      description = 'Reliable performer with moderate potential. Focus on maintaining strengths while developing in key areas.';
    } else if (lowPotentialBoxes.includes(nineBox) || performanceTrend.latestRating <= 2) {
      category = 'Needs Development';
      description = 'Requires focused intervention and performance improvement plan. Consider skills assessment and targeted coaching.';
    } else if (nineBox === 'Unrated' || nineBox === '#N/A') {
      category = 'Needs Assessment';
      description = 'Insufficient data for accurate assessment. Recommend completing 9-box evaluation.';
    }
    
    return { category, description };
  };

  const getDevelopmentRecommendations = (employee) => {
    if (!employee) return [];
    
    const potential = getEmployeePotential(employee);
    const recommendations = [];
    
    if (potential.category === 'High Potential') {
      recommendations.push('Leadership development program');
      recommendations.push('Executive mentoring');
      recommendations.push('Strategic project assignments');
    } else if (potential.category === 'Emerging Talent') {
      recommendations.push('Advanced skill development');
      recommendations.push('Increased project responsibility');
      recommendations.push('Mentoring program participation');
    } else if (potential.category === 'Growing Talent') {
      recommendations.push('Targeted skill development');
      recommendations.push('Stretch assignments');
      recommendations.push('Regular feedback sessions');
    } else if (potential.category === 'Solid Performer') {
      recommendations.push('Maintain current performance');
      recommendations.push('Knowledge sharing opportunities');
      recommendations.push('Process improvement projects');
    } else if (potential.category === 'Needs Development') {
      recommendations.push('Performance improvement plan');
      recommendations.push('Regular coaching sessions');
      recommendations.push('Core skill training');
    } else {
      recommendations.push('Complete 9-box evaluation');
      recommendations.push('Performance review');
      recommendations.push('Career aspiration discussion');
    }
    
    return recommendations.slice(0, 3);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div>Loading employee data...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: colors.midnightBlue, padding: "1rem", color: "white" }}>
        <div className="container mx-auto">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Simple OQ text logo instead of SVG */}
            <div style={{ 
              color: colors.orange, 
              fontWeight: "bold", 
              fontSize: "1.5rem",
              marginRight: "1rem" 
            }}>
              OQ
            </div>
            <h1 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
              Employee Profile Platform
            </h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Search */}
        <div className="mb-6">
          <div style={{ 
            border: `2px solid ${colors.orange}`,
            padding: "0.5rem",
            backgroundColor: "white",
            borderRadius: "0.25rem"
          }}>
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: "100%",
                padding: "0.5rem",
                border: "none",
                outline: "none"
              }}
            />
          </div>
          
          {filteredEmployees.length > 0 && (
            <div style={{ 
              border: `1px solid ${colors.orange}`,
              borderRadius: "0.25rem",
              backgroundColor: "white",
              marginTop: "0.25rem",
              maxHeight: "15rem",
              overflow: "auto"
            }}>
              <ul>
                {filteredEmployees.map((emp, index) => (
                  <li
                    key={index}
                    style={{ 
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee"
                    }}
                    onClick={() => handleEmployeeSelect(emp)}
                  >
                    <span style={{ color: colors.midnightBlue, fontWeight: "500" }}>
                      {emp['Employee(s)']}
                    </span>
                    <span style={{ color: "gray", marginLeft: "0.5rem", fontSize: "0.875rem" }}>
                      #{emp['Personnel no.']}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {selectedEmployee ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            {/* Employee Info */}
            <div style={{ 
              backgroundColor: "white", 
              borderRadius: "0.25rem",
              padding: "1rem",
              borderTop: `4px solid ${colors.orange}`
            }}>
              <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: colors.midnightBlue }}>
                  Employee Profile
                </h2>
                <span style={{ 
                  backgroundColor: selectedEmployee['Omani/Expat'] === 'Omani' ? `${colors.turquoise}20` : `${colors.orange}20`,
                  color: selectedEmployee['Omani/Expat'] === 'Omani' ? colors.turquoise : colors.orange,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem"
                }}>
                  {selectedEmployee['Omani/Expat']}
                </span>
              </div>
              
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: colors.midnightBlue }}>
                  {selectedEmployee['Employee(s)']}
                </h3>
                <p style={{ color: "gray" }}>{selectedEmployee['Positions']}</p>
              </div>
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                  <span style={{ color: "gray" }}>Personnel ID:</span>
                  <span style={{ fontWeight: "500", color: colors.midnightBlue }}>{selectedEmployee['Personnel no.']}</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                  <span style={{ color: "gray" }}>Department:</span>
                  <span style={{ fontWeight: "500", color: colors.midnightBlue }}>{selectedEmployee['Department ']}</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                  <span style={{ color: "gray" }}>Grade:</span>
                  <span style={{ fontWeight: "500", color: colors.midnightBlue }}>{selectedEmployee['Grade']}</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                  <span style={{ color: "gray" }}>Entry Date:</span>
                  <span style={{ fontWeight: "500", color: colors.midnightBlue }}>{selectedEmployee['Entry Date']}</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                  <span style={{ color: "gray" }}>Years of Service:</span>
                  <span style={{ fontWeight: "500", color: colors.midnightBlue }}>
                    {selectedEmployee['Years of experience']} years
                  </span>
                </div>
              </div>
            </div>
            
            {/* Performance */}
            <div style={{ 
              backgroundColor: "white", 
              borderRadius: "0.25rem",
              padding: "1rem",
              borderTop: `4px solid ${colors.turquoise}`
            }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: colors.midnightBlue, marginBottom: "1rem" }}>
                Performance Analysis
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "gray", marginBottom: "0.25rem" }}>2021 Performance</div>
                  <div style={{ 
                    fontWeight: "600", 
                    color: selectedEmployee['2021 perfromance '] === 'Exceptional' || selectedEmployee['2021 perfromance '] === 'Exceed Target' 
                      ? colors.turquoise : colors.midnightBlue 
                  }}>
                    {selectedEmployee['2021 perfromance '] || 'Not Rated'}
                  </div>
                </div>
                
                <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "gray", marginBottom: "0.25rem" }}>2022 Performance</div>
                  <div style={{ 
                    fontWeight: "600", 
                    color: selectedEmployee['2022 perfromance '] === 'Exceptional' || selectedEmployee['2022 perfromance '] === 'Exceed Target' 
                      ? colors.turquoise : colors.midnightBlue 
                  }}>
                    {selectedEmployee['2022 perfromance '] || 'Not Rated'}
                  </div>
                </div>
                
                <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "gray", marginBottom: "0.25rem" }}>2023 Performance</div>
                  <div style={{ 
                    fontWeight: "600", 
                    color: selectedEmployee['2023 perfromance '] === 'Exceptional' || selectedEmployee['2023 perfromance '] === 'Exceed Target' 
                      ? colors.turquoise : colors.midnightBlue 
                  }}>
                    {selectedEmployee['2023 perfromance '] || 'Not Rated'}
                  </div>
                </div>
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem", marginBottom: "1rem" }}>
                <div style={{ fontWeight: "500", color: colors.midnightBlue }}>
                  Performance Trend: {analyzePerformanceTrend(selectedEmployee).trend}
                  {analyzePerformanceTrend(selectedEmployee).consistent ? ' (Consistent)' : ' (Variable)'}
                </div>
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem", marginBottom: "1rem" }}>
                <div style={{ fontWeight: "500", color: colors.midnightBlue, marginBottom: "0.25rem" }}>9-Box Matrix Position:</div>
                <div style={{ color: "gray" }}>
                  {selectedEmployee['9 box matrix'] === '#N/A' || selectedEmployee['9 box matrix'] === 'Unrated' 
                    ? 'Not yet rated' 
                    : selectedEmployee['9 box matrix']}
                </div>
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem" }}>
                <div style={{ fontWeight: "500", color: colors.midnightBlue, marginBottom: "0.25rem" }}>Succession Status:</div>
                <div style={{ color: "gray" }}>
                  {selectedEmployee['Successor'] && selectedEmployee['Successor'].toUpperCase() === 'YES' 
                    ? `Identified as successor for position: ${selectedEmployee['succession position'] || 'Not specified'}` 
                    : 'Not currently in succession plan'}
                </div>
              </div>
            </div>
            
            {/* AI Assessment */}
            <div style={{ 
              backgroundColor: "white", 
              borderRadius: "0.25rem",
              padding: "1rem",
              borderTop: `4px solid ${colors.orange}`
            }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: colors.midnightBlue, marginBottom: "1rem" }}>
                AI Assessment & Recommendations
              </h2>
              
              <div style={{ 
                padding: "0.75rem", 
                borderRadius: "0.25rem", 
                marginBottom: "1.5rem",
                border: `1px solid ${
                  getEmployeePotential(selectedEmployee).category === 'High Potential' ? `${colors.turquoise}30` : `${colors.orange}30`
                }`,
                backgroundColor: getEmployeePotential(selectedEmployee).category === 'High Potential' 
                  ? `${colors.turquoise}10` : `${colors.orange}10`
              }}>
                <h3 style={{ 
                  fontWeight: "600", 
                  marginBottom: "0.5rem",
                  color: getEmployeePotential(selectedEmployee).category === 'High Potential' 
                    ? colors.turquoise : colors.orange 
                }}>
                  {getEmployeePotential(selectedEmployee).category}
                </h3>
                <p style={{ color: "gray" }}>
                  {getEmployeePotential(selectedEmployee).description}
                </p>
              </div>
              
              <h3 style={{ fontWeight: "600", color: colors.midnightBlue, marginBottom: "0.5rem" }}>
                Development Recommendations:
              </h3>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem", marginBottom: "1.5rem" }}>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {getDevelopmentRecommendations(selectedEmployee).map((rec, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                      <span style={{ 
                        width: "8px", 
                        height: "8px", 
                        borderRadius: "50%", 
                        backgroundColor: colors.orange,
                        display: "inline-block",
                        marginRight: "0.5rem"
                      }}></span>
                      <span style={{ color: "gray" }}>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem" }}>
                <h3 style={{ fontWeight: "600", color: colors.midnightBlue, marginBottom: "0.5rem" }}>
                  Key Focus Areas:
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem" }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem", color: colors.turquoise }}>
                      Strengths to Leverage:
                    </h4>
                    <p style={{ color: "gray", fontSize: "0.875rem" }}>
                      {getEmployeePotential(selectedEmployee).category === 'High Potential' 
                        ? 'Leadership capability and consistent high performance' 
                        : 'Core technical competencies and reliability'}
                    </p>
                  </div>
                  
                  <div style={{ backgroundColor: "#f8f9fa", padding: "0.75rem", borderRadius: "0.25rem" }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem", color: colors.orange }}>
                      Areas for Development:
                    </h4>
                    <p style={{ color: "gray", fontSize: "0.875rem" }}>
                      {getEmployeePotential(selectedEmployee).category === 'High Potential' 
                        ? 'Strategic thinking and broader organizational impact' 
                        : 'Performance consistency and technical skill enhancement'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "0.25rem",
            padding: "2rem",
            textAlign: "center"
          }}>
            <div style={{ 
              fontWeight: "600", 
              fontSize: "1.25rem", 
              color: colors.midnightBlue,
              marginBottom: "0.5rem"
            }}>
              No Employee Selected
            </div>
            <p style={{ color: "gray", marginBottom: "1.5rem" }}>
              Search for an employee by name or ID to view their profile
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfilePlatform;
