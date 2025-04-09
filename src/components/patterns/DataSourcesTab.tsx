// src/components/DataSources/DataSourcesTab.tsx (or your chosen path)
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Use Shadcn Badge
import { Upload, FilePlus, Sliders, Database, FileCsv, Wifi, User } from 'lucide-react';
import { DataSource } from '../../types/match'; // Assuming types are in ../../types

interface DataSourcesTabProps {
  dataSources: DataSource[];
  handleImportData: () => void;
  handleAddDataSource: () => void; // Added handler for "New Data Source"
  handleConfigureDataSource: (id: string) => void; // Added handler for config button
}

// Helper function for status badge styling
const getStatusBadgeVariant = (status: string): "success" | "destructive" | "secondary" | "outline" => {
  switch (status?.toLowerCase()) {
    case 'active': return 'success';
    case 'error':
    case 'failed': return 'destructive';
    case 'inactive':
    case 'paused': return 'secondary';
    default: return 'outline';
  }
};

// Helper function for source type badge styling and icon
const getSourceTypeInfo = (type: string): { variant: "default" | "secondary" | "outline", icon: React.ReactNode, label: string } => {
  switch (type?.toLowerCase()) {
    case 'api': return { variant: 'default', icon: <Wifi className="h-3 w-3 mr-1" />, label: 'API' };
    case 'csv': return { variant: 'default', icon: <FileCsv className="h-3 w-3 mr-1" />, label: 'CSV' };
    case 'database': return { variant: 'default', icon: <Database className="h-3 w-3 mr-1" />, label: 'Adatbázis' };
    case 'manual': return { variant: 'secondary', icon: <User className="h-3 w-3 mr-1" />, label: 'Manuális' };
    default: return { variant: 'outline', icon: null, label: type || 'Ismeretlen' };
  }
};


/**
 * Displays and manages data sources used for analysis.
 */
const DataSourcesTab: React.FC<DataSourcesTabProps> = ({
  dataSources,
  handleImportData,
  handleAddDataSource,
  handleConfigureDataSource
}) => {

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('hu-HU', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return 'Érvénytelen dátum';
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h3 className="text-xl font-semibold text-white">Adatforrások Kezelése</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2"
            onClick={handleImportData}
          >
            <Upload className="h-4 w-4" />
            <span>Adat Importálása</span>
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={handleAddDataSource} // Use the new handler
          >
            <FilePlus className="h-4 w-4" />
            <span>Új Adatforrás</span>
          </Button>
        </div>
      </div>

      <div className="bg-gray-900/40 rounded-lg p-1 sm:p-4 mb-6 border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40 ">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-gray-300 font-medium">Név</TableHead>
                <TableHead className="text-gray-300 font-medium">Típus</TableHead>
                <TableHead className="text-gray-300 font-medium hidden md:table-cell">Leírás</TableHead>
                <TableHead className="text-gray-300 font-medium hidden lg:table-cell">Utolsó Szinkron</TableHead>
                <TableHead className="text-gray-300 font-medium text-center">Mérkőzések</TableHead>
                <TableHead className="text-gray-300 font-medium text-center">Státusz</TableHead>
                <TableHead className="text-gray-300 font-medium text-right">Műveletek</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources && dataSources.length > 0 ? (
                dataSources.map((source) => {
                  const typeInfo = getSourceTypeInfo(source.type);
                  const statusVariant = getStatusBadgeVariant(source.status);
                  return (
                    <TableRow key={source.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-semibold text-white py-3">{source.name}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant={typeInfo.variant} className="capitalize flex items-center w-fit">
                           {typeInfo.icon} {typeInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm hidden md:table-cell py-3">{source.description || '-'}</TableCell>
                      <TableCell className="text-gray-400 text-sm hidden lg:table-cell py-3">{formatDate(source.lastSync)}</TableCell>
                      <TableCell className="text-center font-medium text-white py-3">{source.matches?.toLocaleString('hu-HU') ?? '-'}</TableCell>
                      <TableCell className="text-center py-3">
                        <Badge variant={statusVariant} className="capitalize">
                          {source.status || 'Ismeretlen'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                          onClick={() => handleConfigureDataSource(source.id)} // Use handler
                          aria-label={`Configure ${source.name}`}
                        >
                          <Sliders className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                    Nincsenek adatforrások konfigurálva.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DataSourcesTab;
